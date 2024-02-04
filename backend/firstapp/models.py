from django.db import models

class Person(models.Model):
    firstname = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.firstname + " " + self.surname + " "+self.description
