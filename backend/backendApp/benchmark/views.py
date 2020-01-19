from django.http import HttpResponse, JsonResponse
from .models import Measure 

def index(request):
    return HttpResponse("Hello, world. You're at the benchmark index.")

def allMeasures(request):
    measures = Measure.objects.all()
    return JsonResponse({"pomiary" : list(measures)}, safe=False)