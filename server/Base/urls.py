from django.urls import path
from . import views

urlpatterns = [
    path('category-list/', views.category_list, name="category-list"),
    path('category-filter/<str:id>/', views.category_list, name="category-filter"),
    path('product-list/', views.product_list,name="product-list"),
    path('product-filter/<str:id>/', views.product_list, name="product-filter"),
    path('product-filter-client/<str:id>/', views.filter_product, name="filter_product"),
]