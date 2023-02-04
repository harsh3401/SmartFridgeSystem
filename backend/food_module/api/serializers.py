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
    calories = serializers.FloatField()
    total_fat = serializers.FloatField()
    sugar = serializers.FloatField()
    sodium = serializers.FloatField()
    protein = serializers.FloatField()
    saturated_fat = serializers.FloatField()
    carbohydrates = serializers.FloatField()

    class Meta:
        fields = [
            "calories",
            "total_fat",
            "sugar",
            "sodium",
            "protein",
            "saturated_fat",
            "carbohydrates",
        ]


class DummmyRecommendSerializer(serializers.Serializer):
    ingredients = serializers.ListField()
    nutrition_data = serializers.ListField()
    recipe_name = serializers.CharField()
    recipe_rank = serializers.IntegerField()
    steps = serializers.ListField()
    time_to_make = serializers.IntegerField()

    class Meta:
        fields = [
            "ingredients",
            "nutrition_data",
            "recipe_name",
            "recipe_rank",
            "steps",
            "time_to_make",
        ]


class RecommendationsResponseSerializer(serializers.Serializer):
    recommendations = DummmyRecommendSerializer(many=True, read_only=True)

    class Meta:
        fields = ["recommendations"]
