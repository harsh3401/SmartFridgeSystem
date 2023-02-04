from rest_framework.views import APIView, Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_201_CREATED,
    HTTP_403_FORBIDDEN,
    HTTP_204_NO_CONTENT,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ..models import Image, Temperature, OpenCount
from .serializers import ImageSerializer, TemperatureSerializer, OpenCountSerializer
import datetime
from firebase_admin import messaging
from user_module.models import CustomUser
import firebase_admin
from drf_yasg import openapi

# initialize firebase app if not already initialized
if not firebase_admin._apps:
    firebase_admin.initialize_app()


class ImageAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ImageSerializer

    @swagger_auto_schema(
        operation_summary="Get the last image of the fridge",
        responses={200: ImageSerializer},
    )
    def get(self, request):
        user = request.user

        qs = Image.objects.filter(user=user)
        return Response(ImageSerializer(qs, many=True).data, status=HTTP_200_OK)


class TemperatureAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TemperatureSerializer

    @swagger_auto_schema(
        operation_summary="Get the last 10 refrigerator temperature readings",
        responses={200: TemperatureSerializer},
    )
    def get(self, request):
        user = request.user

        qs = Temperature.objects.filter(user=user).order_by("-created_at")[:10]
        return Response(TemperatureSerializer(qs, many=True).data, status=HTTP_200_OK)


class OpenCountAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OpenCountSerializer

    @swagger_auto_schema(
        operation_summary="Get the number of times the fridge has been opened for that day",
        responses={200: OpenCountSerializer},
    )
    def get(self, request):
        user = request.user

        # get the previous date
        prev = datetime.datetime.now() - datetime.timedelta(days=1)
        qs = OpenCount.objects.filter(user=user, created_at__gte=prev)
        return Response(OpenCountSerializer(qs, many=True).data, status=HTTP_200_OK)

    # update the open count
    @swagger_auto_schema(
        operation_summary="Update the open count for that day / Create new"
    )
    def post(self, request):
        user = request.user
        OpenCount.objects.create(user=user)
        return Response(status=HTTP_200_OK)


# this section entails the requests to arduino for current image and temperature
class HardwareImageAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Request the arduino to take a picture of the fridge"
    )
    def get(self, request):
        response = request.get("<arduino_ip>/api/image")
        # 200 means that arduino is available
        if response.status_code == 200:
            return Response(status=HTTP_200_OK)
        return Response(
            {"error": "Could not get image from arduino"}, status=HTTP_400_BAD_REQUEST
        )


class HardwareTemperatureAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Request the arduino to get the temperature of the fridge"
    )
    def get(self, request):
        response = request.get("<arduino_ip>/api/temperature")
        # 200 means that arduino is available
        if response.status_code == 200:
            return Response(status=HTTP_200_OK)
        return Response(
            {"error": "Could not get temperature from arduino"},
            status=HTTP_400_BAD_REQUEST,
        )


def send_notification(notif_type, description=None, image_url=None, token=None):
    """returns firebase message object based on notification type"""

    print("sending notification to: ", token)

    if notif_type == "image":
        return messaging.Message(
            notification=messaging.Notification(
                title="Current image of your fridge",
                body="Click to view",
                image=image_url,
            ),
            token=token,
        )

    return messaging.Message(
        notification=messaging.Notification(
            title=f"The temperature of your fridge is {description}",
            body="Click to view",
        ),
        token=token,
    )


class ArduinoListenerAPIView(APIView):
    """
    Listens for requests from arduino and depending on type, sends a notification to the user based on the FCM token
    """

    # TODO: set custom permission class to check if request is from arduino (custom HEADER as well as ip)
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="Arduino listener for image and temperature (internal use only)"
    )
    def post(self, request):
        type = request.data.get("type")
        user = request.data.get("user")
        user = CustomUser.objects.filter(email=user)

        # in the case that the user or user's FCM token is deleted, we don't want to send a notification
        if not user or user[0].fcm_token is None:
            return Response(status=HTTP_204_NO_CONTENT)

        user = user[0]
        if type == "image":
            # save the image and then send notification
            obj = Image.objects.create(user=user, image=request.FILES["image"])
            fb_notif_obj = send_notification(
                type, image_url=obj.image.url, token=user.fcm_token
            )
            messaging.send(fb_notif_obj)

        elif type == "temperature":
            # save the temperature and then send notification
            obj = Temperature.objects.create(
                user=user, temperature=request.data.get("temperature")
            )
            fb_notif_obj = send_notification(
                type, description=obj.temperature, token=user.fcm_token
            )
            messaging.send(fb_notif_obj)

        return Response(status=HTTP_200_OK)
