# from rest_framework.authtoken.models import Token

# from datetime import timedelta
# from django.utils import timezone
# from django.conf import settings


# # Token time left
# def expires_in(token):
#     time_elapsed = timezone.now() - token.created
#     left_time = timedelta(seconds=settings.TOKEN_EXPIRED_AFTER_SECONDS) - time_elapsed
#     return left_time


# def is_token_expired(token):
#     return expires_in(token) < timedelta(seconds=0)


# # If token is expired then it will be removed
# # and new one with different key will be created
# def token_expire_handler(token):
#     is_expired = is_token_expired(token)
#     if is_expired:
#         token.delete()
#         token = Token.objects.create(user=token.user)
#     return is_expired, token



from rest_framework import authentication
from rest_framework import exceptions
import firebase_admin as admin
import firebase_admin.auth as auth
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):

        token = request.headers.get('Authorization')
        print(token)
        if not token:
            return None

        try:
            decoded_token = auth.verify_id_token(token)
            print("decode token",decoded_token)
            uid = decoded_token["uid"]
            email = decoded_token["email"]
            print(uid,email)
            push_notification = True

        except:
            print("Token not decoded")
            return None
            
        try:
            User = get_user_model()
            user = User.objects.get_or_create(email=email,push_notification=push_notification,uid=uid)
            return user

        except ObjectDoesNotExist:
            return None