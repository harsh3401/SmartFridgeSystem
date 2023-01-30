from .serializers import NutritionSerializer, UserFoodItemSerializer, RecipeRecommendationSerializer
from rest_framework.views import APIView, Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_201_CREATED,
    HTTP_403_FORBIDDEN,
    HTTP_204_NO_CONTENT,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ..models import RecipeRecommendation, UserFoodItem, FoodItem
from ..utils import get_recommendation


class UserFoodItemAPI(APIView):
    """
    Get / Delete / Patch food items to user
    """

    serializer_class = UserFoodItemSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(operation_description="Get the food items for a user")
    def get(self, request):
        user = request.user
        food_items = UserFoodItem.objects.filter(user=user)
        if not food_items.exists():
            return Response({"food_items": []}, status=HTTP_200_OK)

        items = [i.item_name for i in food_items.last().food_item.all()]
        return Response({"food_items": items}, status=HTTP_200_OK)

    @swagger_auto_schema(operation_description="Add food items to a user")
    def post(self, request):
        data = request.data
        ser = UserFoodItemSerializer(data=data)

        if not ser.is_valid():
            return Response({"error": ser.errors}, status=HTTP_400_BAD_REQUEST)

        # create food item if not exist
        # NOTE: need to check for similarity with already existing items in db
        food_item_objs = []
        for i in ser.validated_data["food_item"]:
            qs = FoodItem.objects.filter(item_name=i)
            print(qs)
            if not qs.exists():
                tmp = FoodItem.objects.create(item_name=i)
                food_item_objs.append(tmp.id)
            else:
                food_item_objs.append(qs.first().id)

        obj = UserFoodItem.objects.create(user=request.user)
        obj.food_item.set(food_item_objs)
        obj.save()
        return Response(status=HTTP_200_OK)

    # TODO: add support for patch request


class PastRecipeRecommendAPI(APIView):
    """
    Gets the past recipe recommendations for a user
    """

    permission_classes = [IsAuthenticated]
    serializer_class = RecipeRecommendationSerializer

    @swagger_auto_schema(
        operation_description="Get all the previous recipe recommendations"
    )
    def get(self, request):
        user = request.user
        qs = RecipeRecommendation.objects.filter(user=user)
        ser = RecipeRecommendationSerializer(qs, many=True)
        return Response(data=ser.data, status=HTTP_200_OK)


class GetRecommendations(APIView):
    """
    Calls the DL server in order to get recommendations based on current food items.
    Can be executed periodically / when frontend calls api
    """

    permission_classes = [IsAuthenticated]
    serializer_class = UserFoodItemSerializer

    def get(self, request):
        user = request.user
        food_items = UserFoodItem.objects.filter(user=user)
        if not food_items.exists():
            return Response(
                {"detail": "No food items found for user"}, status=HTTP_400_BAD_REQUEST
            )

        items = [i.item_name for i in food_items.last().food_item.all()]
        recommendations = get_recommendation(items)
        # save the recommendations to db
        for i in recommendations["data"][0:3]:
            # get or create the food item
            food_item_objects = []
            for j in i["ingredients"]:
                obj = FoodItem.objects.get_or_create(item_name=j)
                food_item_objects.append(obj[0].id)

            print("creating recipe recommendation: ", i)
            obj = RecipeRecommendation.objects.create(
                user=user,
                recipe_name=i["recipe_name"],
                calories=i["nutrition_data"]["calories (kcal)"],
                total_fat=i["nutrition_data"]["total fat (PDV)"],
                sugar=i["nutrition_data"]["sugar (PDV)"],
                sodium=i["nutrition_data"]["sodium (PDV)"],
                protein=i["nutrition_data"]["protein (PDV)"],
                saturated_fat=i["nutrition_data"]["saturated fat (PDV)"],
                carbohydrates=i["nutrition_data"]["carbohydrates (PDV)"],
                time_to_make=i["time_to_make"],
                steps=i["steps"],
            )
            [obj.ingredients.add(i) for i in food_item_objects]
            obj.save()

        return Response(
            {"recommendations": recommendations["data"][:3]}, status=HTTP_200_OK
        )


class NutritionalDetailsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NutritionSerializer

    def get(self, request):
        # get the average of user recipes nutrition values
        user = request.user
        recipes = RecipeRecommendation.objects.filter(user=user)
        if not recipes.exists():
            return Response(
                {"detail": "No recipes found for user"}, status=HTTP_400_BAD_REQUEST
            )
        
        # get the average of all the recipes
        calories = 0
        total_fat = 0
        sugar = 0
        sodium = 0
        protein = 0
        saturated_fat = 0
        carbohydrates = 0

        for i in recipes:
            calories += i.calories
            total_fat += i.total_fat
            sugar += i.sugar
            sodium += i.sodium
            protein += i.protein
            saturated_fat += i.saturated_fat
            carbohydrates += i.carbohydrates

        calories = calories / recipes.count()
        total_fat = total_fat / recipes.count()
        sugar = sugar / recipes.count()
        sodium = sodium / recipes.count()
        protein = protein / recipes.count()
        saturated_fat = saturated_fat / recipes.count()
        carbohydrates = carbohydrates / recipes.count()

        return Response(
            {"nutrition": [calories, total_fat, sugar, sodium, protein, saturated_fat, carbohydrates]},
            status=HTTP_200_OK,
        )
