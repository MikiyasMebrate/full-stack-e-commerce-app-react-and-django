from rest_framework import serializers
from .models import (
    Category,
    Product,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", 'name', 'category', 'summary', 'description', 'price', 'cover', 'created_at', 'is_active']
