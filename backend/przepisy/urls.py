from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from .views import KategoriaViewSet,PrzepisViewSet, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from . import views

router = DefaultRouter()
router.register('kategorie', KategoriaViewSet, basename='kategoria')
router.register('przepisy', PrzepisViewSet, basename='przepis')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='register')
]

# urlpatterns = format_suffix_patterns(urlpatterns)