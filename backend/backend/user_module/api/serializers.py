from ..models import CustomUser, UserNotification
from rest_framework import serializers


class SignInSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=128)
    password = serializers.CharField(max_length=128)

    class Meta:
        fields = ["email", "password"]


class SignUpSerializer(serializers.Serializer):
    password1 = serializers.CharField(max_length=128, required=True)
    password2 = serializers.CharField(max_length=128, required=True)
    email = serializers.EmailField()

    class Meta:
        fields = ["password1", "password2", "email"]

    def validate(self, data):
        if CustomUser.objects.filter(email=data.get("email")).exists():
            print("this")
            raise serializers.ValidationError("Email is already in use")
        return data

    def create(self, validated_data):
        password = validated_data["password1"]
        validated_data.pop("password1")
        validated_data.pop("password2")
        user = CustomUser.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)
    push_notification = serializers.BooleanField()
    mobile_number = serializers.CharField()
    last_login = serializers.DateTimeField()
    fcm_token = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "push_notification",
            "mobile_number",
            "last_login",
            "fcm_token",
        ]

    # mobile number should be 10 digits
    def validate(self, data):
        if len(data.get("mobile_number")) != 10:
            raise serializers.ValidationError("Mobile number should be 10 digits")
        return data


class UserNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNotification
        fields = "__all__"


class FCMTokenSerializer(serializers.Serializer):
    fcm_token = serializers.CharField()

    class Meta:
        fields = ["fcm_token"]
