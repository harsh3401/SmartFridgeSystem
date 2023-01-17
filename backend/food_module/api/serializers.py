from rest_framework import serializers
from ..models import RecipeRecommendation, FoodItem, UserFoodItem


class UserFoodItemSerializer(serializers.Serializer):
    food_item = serializers.ListField()

    class Meta:
        fields = ["food_item"]


class RecipeRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeRecommendation
        fields = "__all__"


class UserFoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFoodItem
        fields = "__all__"


class NutritionSerializer(serializers.Serializer):
    calories = serializers.IntegerField()
    fat = serializers.IntegerField()
    protein = serializers.IntegerField()
    carbs = serializers.IntegerField()
    sugar = serializers.IntegerField()

    class Meta:
        fields = ["calories", "fat", "protein", "carbs", "sugar"]
    