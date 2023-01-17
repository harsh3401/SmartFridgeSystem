from .views import PingView, SignInView, SignUpAPIView, SignOutAPIView, UserProfileView, UserFCMAPI, UserNotificationAPIView
from django.urls import path

urlpatterns = [
    path('api/auth-ping/', PingView.as_view()),
    path('api/signin/', SignInView.as_view()),
    path('api/signup/', SignUpAPIView.as_view()),
    path('api/signout/', SignOutAPIView.as_view()),
    path('api/profile/', UserProfileView.as_view()),
    path('api/fcm_token/', UserFCMAPI.as_view()),
    path('api/user-notifications/', UserNotificationAPIView.as_view()),
]