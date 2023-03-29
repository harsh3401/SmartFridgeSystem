from django.urls import path
from .views import (
    ImageAPIView,
    TemperatureAPIView,
    OpenCountAPIView,
    HardwareImageAPIView,
    HardwareTemperatureAPIView,
    ArduinoListenerAPIView,
)


urlpatterns = [
    path("image/", ImageAPIView.as_view()),
    path("temperature/", TemperatureAPIView.as_view()),
    path("open-count/", OpenCountAPIView.as_view()),
    path("hardware-image/", HardwareImageAPIView.as_view()),
    path("hardware-temperature/", HardwareTemperatureAPIView.as_view()),
    path("arduino-listener/", ArduinoListenerAPIView.as_view()),
]
