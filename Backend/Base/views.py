from django.http import JsonResponse
from django.shortcuts import render
from .models import Category, Product
from rest_framework.decorators import api_view
from rest_framework import status 


# Create your views here.
@api_view(['GET'])
def category_list(request):
    if request.method == "GET":
        categories = list(Category.objects.all().values())
        context = {
            'categories': categories
        }
        return JsonResponse(context)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)

