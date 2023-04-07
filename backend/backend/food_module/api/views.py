from .serializers import (
    NutritionSerializer,
    RecommendationsResponseSerializer,
    UserFoodItemListSerializer,
    UserFoodItemSerializer,
    RecipeRecommendationSerializer,
    UserFoodItemUpdateSerializer,
)
from rest_framework.views import APIView, Response
from django.forms.models import model_to_dict
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
from drf_yasg import openapi


class UserFoodItemAPI(APIView):
    """
    Get / Delete / Patch food items to user
    """

    serializer_class = UserFoodItemSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get the food items for a user",
        responses={200: UserFoodItemSerializer},
    )
    def get(self, request):
        user = request.user
        food_items = UserFoodItem.objects.filter(user=user)
        if not food_items.exists():
            return Response({"food_items": []}, status=HTTP_200_OK)

        ser = UserFoodItemSerializer(food_items, many=True)
        return Response({"food_items": ser.data}, status=HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Add food items to a user, called manually as well as by DL server",
        # request body should have a list of food items as well as expiration date
        request_body=UserFoodItemUpdateSerializer,
    )
    def post(self, request):
        data = request.data
        ser = UserFoodItemUpdateSerializer(data=data)
        if not ser.is_valid():
            return Response(ser.errors, status=HTTP_400_BAD_REQUEST)

        data = data["food_item"]
        print(f"data: {data}")
        for item in data:
            print(item)
            # create food item if not exist
            # NOTE: need to check for similarity with already existing items in db
            food_item_objs = []
            qs = FoodItem.objects.filter(item_name=item["item_name"])
            if not qs.exists():
                tmp = FoodItem.objects.create(
                    item_name=item["item_name"], expiry_time=item["expiry_time"]
                )
                food_item_objs.append(tmp)
            else:
                food_item_objs.append(qs.first())
            print("here")
            for i in food_item_objs:
                qs = UserFoodItem.objects.filter(user=request.user, food_item=i)
                if not qs.exists():
                    obj = UserFoodItem.objects.create(user=request.user, food_item=i)

                # else
                # dict_obj = model_to_dict( obj )
                print("here")
        food_items = UserFoodItem.objects.filter(user=request.user)
        ser = UserFoodItemSerializer(food_items, many=True)
        return Response({"food_items": ser.data},status=HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_summary="Delete food items from a user based on id (also delete stale food items)",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "food_items": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(type=openapi.TYPE_INTEGER),
                ),
            },
        ),
        responses={
            200: None,
            204: "No food items found for user",
            400: "food_items: This is a required field",
        },
    )
    def delete(self, request):
        user = request.user
        deleted_items = request.data.get("food_items", None)
        if not deleted_items:
            return Response(
                {"error": "food_items: This is a required field"},
                status=HTTP_400_BAD_REQUEST,
            )
        food_items = UserFoodItem.objects.filter(id__in=deleted_items)
        if not food_items.exists():
            return Response(
                {"detail": "No food items found for user"}, status=HTTP_204_NO_CONTENT
            )

        food_items.delete()
        return Response(status=HTTP_200_OK)


class PastRecipeRecommendAPI(APIView):
    """
    Gets the past recipe recommendations for a user
    """

    permission_classes = [IsAuthenticated]
    serializer_class = RecipeRecommendationSerializer

    @swagger_auto_schema(
        operation_summary="Get all the previous recipe recommendations",
        responses={200: RecipeRecommendationSerializer},
    )
    def get(self, request):
        user = request.user
        qs = RecipeRecommendation.objects.filter(user=user)
        ser = RecipeRecommendationSerializer(qs, many=True)
        return Response(data=ser.data, status=HTTP_200_OK)


class GetRecommendations(APIView):
    """
    Calls the DL server in order to get recommendations based on current food items.
    Can be executed periodically / when frontend calls api.
    Creates FoodItem and RecipeRecommendation objects in db.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = UserFoodItemSerializer

    @swagger_auto_schema(
        operation_summary="Get the recipe recommendations for a user",
        responses={
            200: RecommendationsResponseSerializer,
            400: "No food items found for user",
        },
    )
    def get(self, request):
        user = request.user
        food_items = UserFoodItem.objects.filter(user=user)
        if not food_items.exists():
            return Response(
                {"error": "No food items found for user"}, status=HTTP_400_BAD_REQUEST
            )

        items = [i.food_item.item_name for i in food_items]
        recommendations = get_recommendation(items)
        # save the recommendations to db
        for i in recommendations["data"][0:3]:
            # get or create the food item
            food_item_objects = []
            for j in i["ingredients"]:
                # don't know the expiry_time so kept null here
                obj = FoodItem.objects.get_or_create(item_name=j)
                food_item_objects.append(obj[0].id)

            # print("creating recipe recommendation: ", i)
            # print("steps: ", i['steps'])
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

    @swagger_auto_schema(
        operation_summary="Get the average of nutritional details for a user",
        operation_description="Order: calories, total_fat, sugar, sodium, protein, saturated_fat, carbohydrates",
        responses={200: NutritionSerializer},
    )
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
            {
                "nutrition": [
                    calories,
                    total_fat,
                    sugar,
                    sodium,
                    protein,
                    saturated_fat,
                    carbohydrates,
                ]
            },
            status=HTTP_200_OK,
        )


class StaleFoodAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserFoodItemListSerializer

    @swagger_auto_schema(
        operation_summary="Get user stale items",
        responses={200: UserFoodItemListSerializer},
    )
    def get(self, request):
        user = request.user
        qs = UserFoodItem.objects.filter(user=user, is_stale=True)
        ser = UserFoodItemSerializer(qs, many=True)
        return Response(ser.data, status=HTTP_200_OK)
