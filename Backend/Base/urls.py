from django.urls import path
from . import views

urlpatterns = [
    path('category-list/', views.category_list, name="category-list"),
    path('category-filter/<str:id>/', views.category_list, name="category-filter")
]