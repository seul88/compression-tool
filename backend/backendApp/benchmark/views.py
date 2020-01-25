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
        "methods" : [""],
        "method_param" : ""
    },
    ".7z" : {
        "methods" : ["LZMA", "LZMA2", "PPMd", "BZip2", "Deflate", "Delta", "BCJ", "BCJ2"],
        "method_param" : "-m0="
    },
    ".xz" : {
        "methods" : [""],
        "method_param" : ""
    },
}

def index(request):
    return HttpResponse("Hello, world. You're at the benchmark index.")

def allMeasures(request):
    serializedMeasure = serializers.serialize('json', Measure.objects.all(), fields=('metodaKompresji','czasKompresji', 'rozmiarPlikuWejsciowego', 'rozmiarPlikuWyjsciowego', 'stopienKompresji' ,))
    return JsonResponse(serializedMeasure, safe=False)

@csrf_exempt
def compressionCalculation(request, silaKompresji, format):
    HASH = generate_random_hash(5)
    DOWNLOAD_PATH = f'tmp/uploads/{HASH}/'
    UPLOADED_FILE = request.FILES['fileUpload']
    COMPRESSION_FORMAT = list(filter(lambda compression_format: compression_format in format, list(compression_args.keys())))[0] #format in user choice

    default_storage.save(f'{DOWNLOAD_PATH}/{UPLOADED_FILE.name}', ContentFile(UPLOADED_FILE.read()))

    numberOfCompressionMethods = len(compression_args[COMPRESSION_FORMAT]['methods'])
    method_param = compression_args[COMPRESSION_FORMAT]['method_param']
    for method in compression_args[COMPRESSION_FORMAT]['methods']:
        output = subprocess.run(["time", "7z", f"{method_param}{method}", "a", "-r",f"../../archives/{HASH}/archive_{method}{COMPRESSION_FORMAT}", UPLOADED_FILE.name], capture_output=True, cwd = f"{DOWNLOAD_PATH}")
        m = re.search('size: .* bytes \(', output.stdout.decode('ascii'))
        compressed_size = int(m.group(0).split(' ')[1]) 
        compression_time = float(output.stderr.decode('ascii').split(' ')[0][:-4])

        print (f"time: {compression_time}, size: {compressed_size}")
        newMeasure = Measure(metodaKompresji = method, czasKompresji = compression_time, rozmiarPlikuWejsciowego = UPLOADED_FILE.size, rozmiarPlikuWyjsciowego = compressed_size, stopienKompresji = compressed_size/UPLOADED_FILE.size)
        newMeasure.save()
    
    
    #measures = Measure.objects.all()
    serializedMeasure = serializers.serialize('json', Measure.objects.all().order_by('-id')[:numberOfCompressionMethods], fields=('metodaKompresji','czasKompresji', 'rozmiarPlikuWejsciowego', 'rozmiarPlikuWyjsciowego', 'stopienKompresji' ,))
    return JsonResponse(serializedMeasure, safe=False)

def generate_random_hash(length):
    return binascii.b2a_hex(os.urandom(length)).decode('ascii')