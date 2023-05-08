from django.urls import path
from .views import (
    PastRecipeRecommendAPI,
    StaleFoodAPIView,
    UserFoodItemAPI,
    GetRecommendations,
    NutritionalDetailsAPIView,
    FilteredRecipesAPIView
)

urlpatterns = [
    path("prev-recipes/", PastRecipeRecommendAPI.as_view()),
    path("user-food-items/", UserFoodItemAPI.as_view()),
    path("get-recommendation/", GetRecommendations.as_view()),
    path("nutrition/", NutritionalDetailsAPIView.as_view()),
    path("stale-food/", StaleFoodAPIView.as_view()),
    path("filtered-recipes/", FilteredRecipesAPIView.as_view()),

]
