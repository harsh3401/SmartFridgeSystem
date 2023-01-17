from rest_framework.views import APIView, Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_403_FORBIDDEN, HTTP_204_NO_CONTENT
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ..models import Image, Temperature, OpenCount
from .serializers import ImageSerializer, TemperatureSerializer, OpenCountSerializer
import datetime


class ImageAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ImageSerializer

    @swagger_auto_schema(operation_description = "Get the last image of the fridge")
    def get(self, request):
        user = request.user

        qs = Image.objects.filter(user = user)
        return Response(ImageSerializer(qs, many=True).data, status=HTTP_200_OK)


class TemperatureAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TemperatureSerializer

    @swagger_auto_schema(operation_description = "Get the last 10 refrigerator temperature readings")
    def get(self, request):
        user = request.user

        qs = Temperature.objects.filter(user = user).order_by('-created_at')[:10]
        return Response(TemperatureSerializer(qs, many=True).data, status=HTTP_200_OK)


class OpenCountAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OpenCountSerializer

    @swagger_auto_schema(operation_description = "Get the number of times the fridge has been opened for that day")
    def get(self, request):
        user = request.user

        # get the previous date
        prev = datetime.datetime.now() - datetime.timedelta(days=1)
        qs = OpenCount.objects.filter(user = user, created_at__gte=prev)
        return Response(OpenCountSerializer(qs, many=True).data, status=HTTP_200_OK)

    # update the open count
    @swagger_auto_schema(operation_description = "Update the open count for that day / Create new")
    def post(self, request):
        user = request.user
        OpenCount.objects.create(user=user)
        return Response(status=HTTP_200_OK)        


