from ..models import Image, Temperature, OpenCount
from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"
        

class TemperatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temperature
        fields = "__all__"


class OpenCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenCount
        fields = "__all__"