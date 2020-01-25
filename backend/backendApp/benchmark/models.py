from django.db import models

class Measure(models.Model):
    metodaKompresji = models.CharField(max_length=20)
    czasKompresji = models.FloatField()
    rozmiarPlikuWejsciowego = models.IntegerField()
    rozmiarPlikuWyjsciowego = models.IntegerField()
    stopienKompresji = models.FloatField()
