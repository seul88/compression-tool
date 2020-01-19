from django.http import HttpResponse, JsonResponse
from .models import Measure 
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return HttpResponse("Hello, world. You're at the benchmark index.")

def allMeasures(request):
    measures = Measure.objects.all()
    return JsonResponse({"pomiary" : list(measures)}, safe=False)

@csrf_exempt
def compressionCalculation(request, silaKompresji, format):

    # EXEC MEASURE HERE
    # USE VARIABLES silaKompresji and format
    # file to convert is stored as uploaded_file variable


    uploaded_file = request.FILES['fileUpload']
    print(uploaded_file.size) # file size in bytes 
    
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
    newMeasure = Measure(metodaKompresji = metodaKompresji, czasKompresji = czasKompresji, rozmiarPlikuWejsciowego = rozmiarPlikuWejsciowego, rozmiarPlikuWyjsciowego = rozmiarPlikuWyjsciowego, stopienKompresji = stopienKompresji)
    newMeasure.save()
    
    serializedMeasure = serializers.serialize('json', [ newMeasure, ])
    return JsonResponse(serializedMeasure, safe=False)