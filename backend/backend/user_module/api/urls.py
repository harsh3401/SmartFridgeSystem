from .views import (
    PingView,
    SignInView,
    SignUpAPIView,
    SignOutAPIView,
    UserProfileView,
    UserFCMAPI,
    UserNotificationAPIView,
)
from django.urls import path

urlpatterns = [
    path("auth-ping/", PingView.as_view()),
    # path("signin/", SignInView.as_view()),
    # path("signup/", SignUpAPIView.as_view()),
    # path("signout/", SignOutAPIView.as_view()),
    path("profile/", UserProfileView.as_view()),
    path("fcm_token/", UserFCMAPI.as_view()),
    path("user-notifications/", UserNotificationAPIView.as_view()),
]
