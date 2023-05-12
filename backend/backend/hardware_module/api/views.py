from rest_framework.views import APIView, Response
import subprocess
from django.core.files import File
import shutil
import os
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
from food_module.models import  UserFoodItem, FoodItem
from .serializers import ImageSerializer, TemperatureSerializer, OpenCountSerializer
import datetime
from firebase_admin import messaging
from user_module.models import CustomUser
import firebase_admin
from drf_yasg import openapi
import requests
from user_module.models import UserNotification

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
        ESP_IP="192.168.1.2"
        response = requests.get(
                f"http://{ESP_IP}/capture",
        )
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
        response = requests.get(
            "http://<arduino_ip>/api/temperature", data={"user": request.user.email}
        )
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
  
   
        #hardcoded for now
        type = "image"
        user = "hjain123@gmail.com"
        user = CustomUser.objects.filter(email=user)
        name=request.FILES["image"].name


        # in the case that the user or user's FCM token is deleted, we don't want to send a notification
        # if not user or user[0].fcm_token is None:
        if not user:
            return Response(status=HTTP_204_NO_CONTENT)

        user = user[0]
        if type == "image":
            # #TODO save both images to the db and folder 
            wd = os.getcwd()
            os.chdir("../../Yolo/yolov5/")
            # save the image and then send notification
            with open(f'pred_images/{name}', 'wb+') as destination:
                for chunk in request.FILES["image"].chunks():
                    destination.write(chunk)

            #save image to temp path for the prediction

            #call model and save the prediction
            # TODO : modify yolo path 
        
            subprocess.run("python detect.py --weights runs/train/exp/weights/best.pt --img 416 --conf 0.1 --source pred_images --save-txt",shell=True)
            
            #After the results are stored retrieve label from txt and push them to the db for recipe module
            #preprocess the labels for each txt file
            os.chdir("runs/detect/exp/")
            try:
                with open(name, 'rb') as fi:
                        print("here")
                        img= Image.objects.create(user=user, image=request.FILES["image"],image_identified=File(fi))
            except:
                print("here 2")
                img = Image.objects.create(user=user, image=request.FILES["image"],image_identified=request.FILES["image"])
            os.chdir("labels")
            text_files= os.listdir('.')
            print(text_files)
            labels=[]
            #dictionary to store class mappings to yolo indexes
            class_mappings={'0':'Fresh Tomatoe','1':'Stale Tomatoe','2':'Fresh Cabbage','3':'Stale Cabbage','4':'Fresh Apple','5':'Stale Apple'}
            for file in text_files:
                 with open(file,'r') as f:
                     for line in f.readlines():
                        if line[0] not in labels: 
                            labels.append(line[0])
            print(labels)
            os.chdir("../../")
            if os.path.exists(os.getcwd()+'/exp'):
                shutil.rmtree(os.getcwd()+'/exp')
            os.chdir(wd)
            os.chdir("../../Yolo/yolov5/pred_images")
            path=os.getcwd()

            for file_name in os.listdir(path):
              file = path + "/"+file_name
              if os.path.isfile(file):
                print('Deleting file:', file)
                os.remove(file)
            os.chdir(wd)
            #save the items identified
            item_names=[]
            for label in labels:
                item_names.append(class_mappings[label])
            print(item_names)
            
            for item in item_names:
                food_item_objs=[]
                qs = FoodItem.objects.filter(item_name=item)
                if not qs.exists():
                    tmp = FoodItem.objects.create(
                        # TODO modify expire according to item
                        item_name=item, expiry_time=7
                    )
                    food_item_objs.append(tmp)
                else:
                    food_item_objs.append(qs.first())

                for i in food_item_objs:    
                    stale=False
                    if "Stale" in item:
                        stale=True
                    obj = UserFoodItem.objects.create(user=user, food_item=i,is_stale=stale)
                
 
                #TODO S3 uri
          
                fb_notif_obj = send_notification(
                    type, image_url=img.image_identified.url, token=user.fcm_token
                )
                messaging.send(fb_notif_obj)
                # create user notification object
         
                UserNotification.objects.create(
                    user=user, notification_title="Current image of your fridge",     notification_url=img.image_identified.url
                )

        elif type == "temperature":
            # save the temperature and then send notification
            obj = Temperature.objects.create(
                user=user, temperature=request.data.get("temperature")
            )
            fb_notif_obj = send_notification(
                type, description=obj.temperature, token=user.fcm_token
            )
            messaging.send(fb_notif_obj)

            UserNotification.objects.create(
                user=user, notification_title="Current temperature of your fridge", description="Click to view", notification_image='#'
            )

        return Response(status=HTTP_200_OK)
