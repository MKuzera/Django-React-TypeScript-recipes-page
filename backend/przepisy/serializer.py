from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Kategoria, Deszyfr
from .models import Przepis


class KategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategoria
        fields = '__all__'


class PrzepisSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = Przepis
        fields = ["id", "title", "kategoria", "description", "image", "image_url"]
        depth = 1

    def get_image_url(self, obj):
        return "./static" + obj.image.url


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class DeszyfrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deszyfr
        fields = '__all__'
