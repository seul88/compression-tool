# Generated by Django 3.0.2 on 2020-01-19 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Measure',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('metodaKompresji', models.CharField(max_length=20)),
                ('czasKompresji', models.FloatField()),
                ('rozmiarPlikuWejsciowego', models.IntegerField()),
                ('rozmiarPlikuWyjsciowego', models.IntegerField()),
                ('stopienKompresji', models.FloatField()),
            ],
        ),
    ]
