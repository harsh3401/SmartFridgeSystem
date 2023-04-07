from django.db import models
from user_module.models import CustomUser
from django.contrib.postgres.fields import ArrayField


class FoodItem(models.Model):
    item_name = models.CharField(max_length=128, null=False, blank=False)
    expiry_time = models.IntegerField(
        null=True, blank=True
    )  # in how many days will it expire?

    def __str__(self) -> str:
        return self.item_name


class UserFoodItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    is_stale = models.BooleanField(default=False)

    # sets the date and time when the food item was added
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self,*args, **kwargs):
        # dont create new object if food item for user exists
        if UserFoodItem.objects.filter(user=self.user, food_item=self.food_item).exists():
            return
        super().save()

class RecipeRecommendation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    ingredients = models.ManyToManyField(FoodItem)
    recipe_name = models.CharField(max_length=255)
    calories = models.IntegerField(null=True, blank=True)
    total_fat = models.IntegerField(null=True, blank=True)
    sugar = models.IntegerField(null=True, blank=True)
    sodium = models.IntegerField(null=True, blank=True)
    protein = models.IntegerField(null=True, blank=True)
    saturated_fat = models.IntegerField(null=True, blank=True)
    carbohydrates = models.IntegerField(null=True, blank=True)

    steps = models.CharField(max_length=10024, null=True, blank=True)
    time_to_make = models.IntegerField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.recipe_name
