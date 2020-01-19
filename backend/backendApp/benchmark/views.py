from django.http import HttpResponse, JsonResponse
from .models import Measure 
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return HttpResponse("Hello, world. You're at the benchmark index.")

def allMeasures(request):
    measures = Measure.objects.all()
    return JsonResponse({"pomiary" : list(measures)}, safe=False)

@csrf_exempt
def compressionCalculation(request, silaKompresji, format):
    # EXEC MEASURE HERE
    # USE VARIABLES silaKompresji and format
    
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

    newMeasure  = Measure(metodaKompresji = metodaKompresji, czasKompresji = czasKompresji, rozmiarPlikuWejsciowego = rozmiarPlikuWejsciowego, rozmiarPlikuWyjsciowego = rozmiarPlikuWyjsciowego, stopienKompresji = stopienKompresji)
    newMeasure.save()
    serializedMeasure = serializers.serialize('json', [ newMeasure, ])
    return JsonResponse({"pomiar" : serializedMeasure}, safe=False)