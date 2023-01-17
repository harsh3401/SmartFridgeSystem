from django.urls import path
from .views import ImageAPIView, TemperatureAPIView, OpenCountAPIView


urlpatterns = [
    path('api/image/', ImageAPIView.as_view()),
    path('api/temperature/', TemperatureAPIView.as_view()),
    path('api/open-count/', OpenCountAPIView.as_view()),
]