from django.http import HttpResponse, JsonResponse
import os
import subprocess
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from .models import Measure 
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json

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
    DOWNLOAD_PATH = 'tmp/uploads/'
    UPLOADED_FILE = request.FILES['fileUpload']
    COMPRESSION_FORMAT = list(filter(lambda compression_format: compression_format in format, list(compression_args.keys())))[0] #format in user choice

    default_storage.save(f'{DOWNLOAD_PATH}/{UPLOADED_FILE.name}', ContentFile(UPLOADED_FILE.read()))
    print("Comprsession: " + COMPRESSION_FORMAT) #todo: delete

    numberOfCompressionMethods = len(compression_args[COMPRESSION_FORMAT]['methods'])
    method_param = compression_args[COMPRESSION_FORMAT]['method_param']
    for method in compression_args[COMPRESSION_FORMAT]['methods']:
        output = subprocess.run(["7z", f"{method_param}{method}", "a", "-r",f"../archives/archive_{method}{COMPRESSION_FORMAT}", UPLOADED_FILE.name], capture_output=True, cwd = f"{DOWNLOAD_PATH}")
        print(output)
    
    # output = subprocess.run(["7z", "-m0=deflate", "a", "-r","../archives/archive.7z", UPLOADED_FILE.name], capture_output=True, cwd = DOWNLOAD_PATH)
    print(output)

    newMeasure1 = Measure(metodaKompresji = 'A', czasKompresji = 15, rozmiarPlikuWejsciowego = UPLOADED_FILE.size, rozmiarPlikuWyjsciowego = UPLOADED_FILE.size, stopienKompresji = 0)
    newMeasure1.save()
    
    #measures = Measure.objects.all()
    serializedMeasure = serializers.serialize('json', Measure.objects.all().order_by('-id')[:numberOfCompressionMethods], fields=('metodaKompresji','czasKompresji', 'rozmiarPlikuWejsciowego', 'rozmiarPlikuWyjsciowego', 'stopienKompresji' ,))
    return JsonResponse(serializedMeasure, safe=False)