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
    path("api/image/", ImageAPIView.as_view()),
    path("api/temperature/", TemperatureAPIView.as_view()),
    path("api/open-count/", OpenCountAPIView.as_view()),
    path("api/hardware-image/", HardwareImageAPIView.as_view()),
    path("api/hardware-temperature/", HardwareTemperatureAPIView.as_view()),
    path("api/arduino-listener/", ArduinoListenerAPIView.as_view()),
]
