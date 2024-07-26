from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('category-list/', views.category_list, name="category-list"),
    path('category-filter/<str:id>/', views.category_list, name="category-filter"),
    path('product-list/', views.product_list,name="product-list"),
    path('product-filter/<str:id>/', views.product_list, name="product-filter"),
    path('product-filter-client/<str:id>/', views.filter_product, name="filter_product"),

        
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]