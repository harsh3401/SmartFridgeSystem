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
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import *
from .auth import *
from ..models import CustomUser
from rest_framework import generics
from datetime import datetime
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import UpdateAPIView

import os
from django.db.models import Q


class PingView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    @swagger_auto_schema(operation_summary="Authenticated test API")
    def get(self, request):
        return Response("pong")


class SignInView(APIView):
    permission_classes = [AllowAny]
    serializer_class = SignInSerializer

    @swagger_auto_schema(
        operation_summary="Authenticate the user", request_body=SignInSerializer
    )
    def post(self, request):
        data = request.data
        ser = SignInSerializer(data=request.data)
        if not ser.is_valid():
            return Response(data=ser.errors, status=HTTP_400_BAD_REQUEST)

        # get the superusers logged in
        user = authenticate(email=data["email"], password=data["password"])
        if not user:
            return Response(
                {"detail": "Invalid Credentials"}, status=HTTP_400_BAD_REQUEST
            )

        token, _ = Token.objects.get_or_create(user=user)

        # token_expire_handler will check, if the token is expired it will generate new one
        is_expired, token = token_expire_handler(token)
        user.lastLogin = datetime.now()
        user.save()
        return Response(
            {
                "user": user.email,
                "expires_in": expires_in(token),
                "token": token.key,
                "is_superuser": user.is_superuser,
            },
            status=HTTP_200_OK,
        )


class SignOutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(operation_summary="Sign out the user")
    def get(self, request):
        token = Token.objects.filter(user_id=request.user.id)
        token.delete()
        return Response(status=HTTP_200_OK)


class UserProfileView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    lookup_field = "id"

    @swagger_auto_schema(
        operation_summary="Display user details", responses={200: UserSerializer}
    )
    def get(self, request):
        email = request.user
        ser = UserSerializer(request.user)
        return Response(data=ser.data, status=HTTP_200_OK)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(email=self.request.data.get("email"))
        return obj

    @swagger_auto_schema(operation_summary="Partially update the user details")
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        ser = self.get_serializer(instance, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response(
                {"message": "Updated User successfully"}, status=HTTP_200_OK
            )

        else:
            return Response({"message": "failed", "details": ser.errors})

    @swagger_auto_schema(operation_summary="Delete the user associated with email")
    def delete(self, request, *args, **kwargs):
        obj = CustomUser.objects.filter(email=self.request.data.get("email")) or None
        if not obj:
            return Response({"message": "No User found"}, status=HTTP_400_BAD_REQUEST)

        obj.delete()
        return Response({"message": "Deleted User successfully"}, status=HTTP_200_OK)


class SignUpAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer

    @swagger_auto_schema(
        operation_summary="Signup api endpoint", request_body=SignUpSerializer
    )
    def post(self, request):
        data = request.data

        ser = SignUpSerializer(data=data)
        if not ser.is_valid():
            return Response({"error": ser.errors}, status=HTTP_400_BAD_REQUEST)

        # create a user
        user_obj = ser.save()
        return Response(
            {"user": UserSerializer(user_obj).data}, status=HTTP_201_CREATED
        )


class UserFCMAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FCMTokenSerializer

    @swagger_auto_schema(
        operation_summary="Get authenticated user's FCM token",
        responses={200: FCMTokenSerializer},
    )
    def get(self, request):
        return Response(data={"fcm_token": request.user.fcm_token}, status=HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Save the user's FCM token", request_body=FCMTokenSerializer
    )
    def post(self, request):
        fcm_token = request.data.get("fcm_token", None)
        if not fcm_token:
            return Response(
                {"error": "FCM Token is a required field"}, status=HTTP_400_BAD_REQUEST
            )
        user = request.user
        user.fcm_token = fcm_token
        user.save()
        return Response(status=HTTP_201_CREATED)


class UserNotificationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserNotificationSerializer

    @swagger_auto_schema(
        operation_summary="Get last 10 notifications of the user",
        responses={200: UserNotificationSerializer},
    )
    def get(self, request):
        user = request.user
        notifications = UserNotification.objects.filter(user=user).order_by("-id")[:10]
        ser = UserNotificationSerializer(notifications, many=True)
        return Response(data=ser.data, status=HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Update the user's notification read field to true"
    )
    def post(self, request):
        user = request.user
        notif_id = request.POST.get("id", None)
        if not notif_id:
            return Response(
                {"error": "Notification id is a required field"},
                status=HTTP_400_BAD_REQUEST,
            )
        notifications = UserNotification.objects.filter(user=user, id=notif_id)
        notifications.update(read=True)
        return Response(status=HTTP_200_OK)
