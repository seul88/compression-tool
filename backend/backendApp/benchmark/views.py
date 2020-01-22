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

def index(request):
    return HttpResponse("Hello, world. You're at the benchmark index.")

def allMeasures(request):
    serializedMeasure = serializers.serialize('json', Measure.objects.all(), fields=('metodaKompresji','czasKompresji', 'rozmiarPlikuWejsciowego', 'rozmiarPlikuWyjsciowego', 'stopienKompresji' ,))
    return JsonResponse(serializedMeasure, safe=False)

@csrf_exempt
def compressionCalculation(request, silaKompresji, format):

    # EXEC MEASURE HERE
    # USE VARIABLES silaKompresji and format
    # file to convert is stored as uploaded_file variable


    uploaded_file = request.FILES['fileUpload']

    path = default_storage.save(f'tmp/uploads/{uploaded_file.name}', ContentFile(uploaded_file.read()))
    tmp_file = os.path.join(settings.MEDIA_ROOT, path)

    print(uploaded_file.size) # file size in bytes
    print(path) 
    
    #########
    #########
    #########

    # PASS MEASURED VALUES HERE
    # (mockup measure parameters)
    
    metodaKompresji = "ABCD"
    czasKompresji = 15
    rozmiarPlikuWejsciowego = 20
    rozmiarPlikuWyjsciowego = 25
    stopienKompresji = 30

    # Here: refactor for array of few measures
    #newMeasure = Measure(metodaKompresji = metodaKompresji, czasKompresji = czasKompresji, rozmiarPlikuWejsciowego = rozmiarPlikuWejsciowego, rozmiarPlikuWyjsciowego = rozmiarPlikuWyjsciowego, stopienKompresji = stopienKompresji)
    #newMeasure.save()
    
    #serializedMeasure = serializers.serialize('json', [ newMeasure, ])
    #return JsonResponse(serializedMeasure, safe=False)

    numberOfCompressionMethods = 5

    output = subprocess.run(["7z", "-m0=deflate", "a", "-r","../archives/archive.7z", uploaded_file.name], capture_output=True, cwd = 'tmp/uploads')
    print(output)

    newMeasure1 = Measure(metodaKompresji = 'A', czasKompresji = 15, rozmiarPlikuWejsciowego = uploaded_file.size, rozmiarPlikuWyjsciowego = uploaded_file.size, stopienKompresji = 0)
    newMeasure2 = Measure(metodaKompresji = 'B', czasKompresji = 25, rozmiarPlikuWejsciowego = uploaded_file.size, rozmiarPlikuWyjsciowego = uploaded_file.size, stopienKompresji = 0)
    newMeasure3 = Measure(metodaKompresji = 'C', czasKompresji = 35, rozmiarPlikuWejsciowego = uploaded_file.size, rozmiarPlikuWyjsciowego = uploaded_file.size, stopienKompresji = 0)
    newMeasure4 = Measure(metodaKompresji = 'D', czasKompresji = 45, rozmiarPlikuWejsciowego = uploaded_file.size, rozmiarPlikuWyjsciowego = uploaded_file.size, stopienKompresji = 0)
    newMeasure5 = Measure(metodaKompresji = 'E', czasKompresji = 55, rozmiarPlikuWejsciowego = uploaded_file.size, rozmiarPlikuWyjsciowego = uploaded_file.size, stopienKompresji = 0)
 
    newMeasure1.save()
    newMeasure2.save()
    newMeasure3.save()
    newMeasure4.save()
    newMeasure5.save()
    
    #measures = Measure.objects.all()
    serializedMeasure = serializers.serialize('json', Measure.objects.all().order_by('-id')[:numberOfCompressionMethods], fields=('metodaKompresji','czasKompresji', 'rozmiarPlikuWejsciowego', 'rozmiarPlikuWyjsciowego', 'stopienKompresji' ,))
    return JsonResponse(serializedMeasure, safe=False)