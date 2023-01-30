from django.db import models
from user_module.models import CustomUser


class FoodItem(models.Model):
    item_name = models.CharField(max_length=128, null=False, blank=False)
    expiry_time = models.DateTimeField(null=True, blank=True)

    def __str__(self) -> str:
        return self.item_name


class UserFoodItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    food_item = models.ManyToManyField(FoodItem)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


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

    steps = models.CharField(max_length=1024, null=True, blank=True)
    time_to_make = models.IntegerField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.recipe_name
