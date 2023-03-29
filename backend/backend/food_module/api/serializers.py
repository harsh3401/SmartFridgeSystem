import ast
from rest_framework import serializers
from ..models import RecipeRecommendation, FoodItem, UserFoodItem


class UserFoodItemSerializer(serializers.ModelSerializer):
    item_name = serializers.SerializerMethodField(source="food_item.item_name")
    is_stale = serializers.BooleanField(read_only=True)

    class Meta:
        model = UserFoodItem
        fields = ["item_name", "is_stale", "created_at", "updated_at", "id"]

    def get_item_name(self, obj):
        return obj.food_item.item_name


class UserFoodItemListSerializer(serializers.Serializer):
    food_item = UserFoodItemSerializer(many=True, read_only=True)

    class Meta:
        fields = ["food_item"]


class DummyUserFoodItemSerializer(serializers.Serializer):
    item_name = serializers.CharField()
    expiry_time = serializers.IntegerField()

    class Meta:
        fields = ["food_item", "expiry_time"]


class UserFoodItemUpdateSerializer(serializers.Serializer):
    food_item = DummyUserFoodItemSerializer(many=True)

    class Meta:
        fields = ["food_item"]


class RecipeRecommendationSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()
    steps = serializers.SerializerMethodField()

    class Meta:
        model = RecipeRecommendation
        fields = "__all__"

    def get_ingredients(self, obj):
        return obj.ingredients.values_list("item_name", flat=True)

    def get_steps(self, obj):
        return ast.literal_eval(obj.steps)


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
