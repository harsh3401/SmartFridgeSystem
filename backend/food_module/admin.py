from django.contrib import admin
from .models import FoodItem, RecipeRecommendation, UserFoodItem
from django.contrib.admin import ModelAdmin


class CustomUserFoodItemAdmin(ModelAdmin):
    filter_horizontal = ("food_item",)


class CustomRecipeRecommendationAdmin(ModelAdmin):
    filter_horizontal = ("ingredients",)
    fields = [
        "user",
        "ingredients",
        "recipe_name",
        "calories",
        "total_fat",
        "sugar",
        "sodium",
        "protein",
        "steps",
        "created_at",
        "updated_at",
    ]
    readonly_fields = ["created_at", "updated_at"]


admin.site.register(FoodItem)
admin.site.register(RecipeRecommendation, CustomRecipeRecommendationAdmin)
admin.site.register(UserFoodItem, CustomUserFoodItemAdmin)
