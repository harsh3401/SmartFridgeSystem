from django.db import models
from user_module.models import CustomUser
from datetime import datetime

class Image(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="hardware_images/")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email + " --> " + self.image.name


# TODO: create cronjob to auto track temperature, hourly basis
class Temperature(models.Model):
    temperature = models.FloatField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class OpenCount(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    count = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email + " --> " + str(self.count)

    # if same day, increment that same obj else create new obj
    def save(self, *args, **kwargs):
        date = datetime.today()
        qs = OpenCount.objects.filter(user=self.user, created_at__contains=date)
        if qs:
            obj = qs[0].count() + 1
            obj.save()
            return super(OpenCount, self).save(*args, **kwargs)
        return super(OpenCount, self).save(*args, **kwargs)
