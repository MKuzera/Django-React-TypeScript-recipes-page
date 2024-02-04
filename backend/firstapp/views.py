import os

from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Person
from .serializers import serializer


def hello(request):
    return render(request, "hello.html", {"name": os.getlogin()})


@api_view(['GET', 'POST'])
def list(request,format=None):
    if request.method == 'GET':
        p = Person.objects.all()
        seria = serializer(p, many=True)
        return Response(seria.data)
    if request.method == 'POST':
        seria = serializer(data=request.data)
        if seria.is_valid():
            seria.save()
            return Response(seria.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', "DELETE"])
def person_detail(request,id,format = None):
    try:
        pom = Person.objects.get(pk=id)
    except Person.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        seria = serializer(pom)
        return Response(seria.data)
    elif request.method == 'PUT':
        seria = serializer(pom,data=request.data)
        if seria.is_valid():
            seria.save()
            return Response(seria.data)
        else:
            return Response(seria.errors,status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        pom.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
