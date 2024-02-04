from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path("hello/", views.hello),
    path("list/", views.list),
    path("list/<int:id>", views.person_detail)
]

urlpatterns = format_suffix_patterns(urlpatterns)
