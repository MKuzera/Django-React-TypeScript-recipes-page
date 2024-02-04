from rest_framework import serializers
from .models import Person

class serializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ["id","firstname","surname","description"]
