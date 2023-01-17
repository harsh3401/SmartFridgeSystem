from django.db import models
from django.contrib.auth.models import BaseUserManager, PermissionsMixin, AbstractBaseUser
from django.core.validators import MinLengthValidator
from django.forms import ValidationError
from django.contrib.postgres.fields import ArrayField

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class CustomUser(TimeStampedModel, AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'email'

    email = models.EmailField(db_index=True, unique=True)
    push_notification = models.BooleanField(default=False)
    mobile_number = models.CharField(validators=[MinLengthValidator(10, 'Mobile cannot be less than 10 characters')], max_length=10)
    last_login = models.DateTimeField(null=True, blank=True)
    fcm_token = models.CharField(max_length=1024, null=True, blank=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    def __str__(self) -> str:
        return self.email
    


class UserNotification(TimeStampedModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    notification_title = models.CharField(max_length=255)
    notification_body = models.CharField(max_length=255)
    notification_image = models.ImageField(upload_to="notifications/images/", null=True, blank=True)
    notification_url = models.URLField(null=True, blank=True)
    read = models.BooleanField(default=False)