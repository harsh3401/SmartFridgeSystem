from django.urls import path
from .views import PastRecipeRecommendAPI, UserFoodItemAPI, GetRecommendations, NutritionalDetailsAPIView

urlpatterns = [
    path("api/prev-recipes/", PastRecipeRecommendAPI.as_view()),
    path("api/user-food-items/", UserFoodItemAPI.as_view()),
    path("api/get-recommendation/", GetRecommendations.as_view()),
    path("api/nutrition/", NutritionalDetailsAPIView.as_view()),
]
