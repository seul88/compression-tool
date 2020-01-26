import os
import subprocess
import binascii
import json
import re
from .models import Measure 
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.core import serializers
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt

compression_args = {
    ".zip" : {
        "methods" : ["Deflate", "Deflate64", "BZip2", "LZMA", "PPMd"],
        "method_param" : "-mm="       
    },
    ".gz" : {
        "methods" : ["Deflate"],
        "method_param" : False
    },
    ".7z" : {
        "methods" : ["LZMA", "LZMA2", "PPMd", "BZip2", "Deflate", "Delta", "BCJ", "BCJ2"],
        "method_param" : "-m0="
    },
    ".xz" : {
        "methods" : ["LZMA2"],
        "method_param" : False
    },
}

compression_str = {
    "słaba" : 3,
    "średnia" : 8,
    "mocna" : 9
}

def index(request):
    return HttpResponse("Hello, world. You're at the benchmark index.")

def allMeasures(request):
    serializedMeasure = serializers.serialize('json', Measure.objects.all(), fields=('metodaKompresji','czasKompresji', 'rozmiarPlikuWejsciowego', 'rozmiarPlikuWyjsciowego', 'stopienKompresji' ,))
    return JsonResponse(serializedMeasure, safe=False)

@csrf_exempt
def compressionCalculation(request, silaKompresji, format):
    HASH = generate_random_hash(5)
    UPLOAD_FOLDER_PATH = f'tmp/uploads/{HASH}/'
    UPLOADED_FILE = request.FILES['fileUpload']
    RELATIVE_ARCHIVE_FOLDER = f"../../archives/{HASH}"
    default_storage.save(f'{UPLOAD_FOLDER_PATH}/{UPLOADED_FILE.name}', ContentFile(UPLOADED_FILE.read()))
    measures = []
    print(format)
    if format == "Dowolny": 
        for my_format in list(compression_args.keys()): #todo:refactor
            measures += measure_methods_for_format(my_format, UPLOADED_FILE, UPLOAD_FOLDER_PATH, RELATIVE_ARCHIVE_FOLDER, silaKompresji)
    else:
        COMPRESSION_FORMAT = list(filter(lambda compression_format: compression_format in format, list(compression_args.keys())))[0]
        measures += measure_methods_for_format(COMPRESSION_FORMAT, UPLOADED_FILE, UPLOAD_FOLDER_PATH, RELATIVE_ARCHIVE_FOLDER, silaKompresji)

    serializedMeasure = save_and_serialize_measures(measures)
    return JsonResponse(serializedMeasure, safe=False)

def generate_random_hash(length):
    return binascii.b2a_hex(os.urandom(length)).decode('ascii')

def measure_methods_for_format(compression_format, target_file, file_folder, archive_folder, sila_kompresji):
    measures = []
    method_param = compression_args[compression_format]['method_param']
    for method in compression_args[compression_format]['methods']:
        method_argument = f"{method_param}{method}" if method_param else ""
        output = subprocess.run(["time", "7z", method_argument, f"-mx={compression_str[sila_kompresji]}", "a", "-r",f"{archive_folder}/archive_{method}{compression_format}", target_file.name], capture_output=True, cwd = f"{file_folder}")
        compressed_size, compression_time = process_output_for_time_and_size(output)
        measures.append(Measure(
                        metodaKompresji = f"{method}_{compression_format}",
                        czasKompresji = compression_time,
                        rozmiarPlikuWejsciowego = target_file.size,
                        rozmiarPlikuWyjsciowego = compressed_size,
                        stopienKompresji = compressed_size/target_file.size)
                    )
    return measures

def process_output_for_time_and_size(output):
    m = re.search('size: .* bytes \(', output.stdout.decode('ascii'))
    compressed_size = int(m.group(0).split(' ')[1]) 
    compression_time = float(output.stderr.decode('ascii').split(' ')[0][:-4])
    return compressed_size, compression_time

def save_and_serialize_measures(measures):
    for measure in measures:
        measure.save()
    numberOfCompressionMethods = len(measures)
    return serializers.serialize('json', Measure.objects.all().order_by('-id')[:numberOfCompressionMethods], fields=('metodaKompresji','czasKompresji', 'rozmiarPlikuWejsciowego', 'rozmiarPlikuWyjsciowego', 'stopienKompresji' ,))

