from django.db import models


# Create your models here.

class Kategoria(models.Model):
    kategoria = models.CharField(max_length=50)

    def __str__(self):
        return self.kategoria


class Przepis(models.Model):
    title = models.CharField(max_length=50)
    kategoria = models.ManyToManyField(Kategoria)
    description = models.TextField()
    image = models.ImageField(upload_to="static/img/%y")

    def __str__(self):
        return self.title


class Deszyfr(models.Model):
    login = models.CharField(max_length=100)
    key = models.CharField(max_length=300)

    def __str__(self):
        return self.login
