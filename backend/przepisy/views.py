import json
from datetime import datetime
from datetime import timedelta

import jwt
from django.conf import settings
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, status, permissions, generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Kategoria, Przepis
from .serializer import KategoriaSerializer, PrzepisSerializer, UserSerializer
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes, permission_classes


# Create your views here.
class KategoriaViewSet(viewsets.ModelViewSet):
    serializer_class = KategoriaSerializer

    def get_queryset(self):
        kategorie = Kategoria.objects.all()
        return kategorie


class PrzepisViewSet(viewsets.ModelViewSet):
    serializer_class = PrzepisSerializer

    def get_queryset(self):
        przepisy = Przepis.objects.all()
        return przepisy

    def create(self, request, *args, **kwargs):
        cookie = request.COOKIES.get('access_token')
        if cookie is not None:
            try:
                decoded_token = jwt.decode(cookie,settings.SIMPLE_JWT["SIGNING_KEY"], algorithms=['HS256'])
                user_id = decoded_token['user_id']
                try:
                    user = User.objects.get(id=user_id)
                except User.DoesNotExist:
                    return HttpResponse("Użytkownik nie istnieje",status=401)

            except jwt.ExpiredSignatureError:
                return HttpResponse("Token wygasł", status=401)
            except jwt.InvalidTokenError:
                return HttpResponse("Nieprawidłowy token", status=401)
        else:
            return HttpResponse("Brak tokena", status=401)

        data = json.loads(request.data.get('data'))
        new_przepis = Przepis.objects.create(title=data["title"], description=data["description"],
                                             image=request.data.get('image'))
        new_przepis.save()

        for kategoria in data["kategoria"]:
            obj, created = Kategoria.objects.get_or_create(kategoria=kategoria["kategoria"])
            new_przepis.kategoria.add(obj)

        serializer = PrzepisSerializer(new_przepis)
        return Response(serializer.data)

    @api_view(['GET', 'PUT', "DELETE"])
    def przepis_detail(self, request, id, format=None):
        try:
            pom = Przepis.objects.get(id=id)
        except Przepis.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            seria = PrzepisSerializer(pom)
            return Response(seria.data)
        elif request.method == 'PUT':
            data = request.data
            seria = PrzepisSerializer(pom, data=data)
            if seria.is_valid():
                seria.save()
                return Response(seria.data)
            else:
                return Response(seria.errors, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'DELETE':
            pom.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        username = request.data.get('username')
        email = request.data.get('email')

        if User.objects.filter(username=username).exists():
            return Response({"error": "Login already exists"}, status=status.HTTP_400_BAD_REQUEST)
        elif User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> JsonResponse:
        response = super().post(request, *args, **kwargs)
        access_token = response.data["access"]
        refresh_token = response.data["refresh"]
        response2 = JsonResponse({'message': 'Login successful'})
        response2.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=access_token,
            expires=datetime.utcnow() + timedelta(minutes=60),
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite="None",
        )
        response2.set_cookie(
            key="refresh_token",
            value=refresh_token,
            expires=datetime.utcnow() + timedelta(days=1),
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite="None",
        )
        return response2
