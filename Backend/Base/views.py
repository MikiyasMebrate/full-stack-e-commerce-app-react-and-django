from django.http import JsonResponse
from django.shortcuts import render
from .models import Category, Product
from rest_framework.decorators import api_view
from rest_framework import status 
import time


# Create your views here.
@api_view(['GET', 'DELETE', 'POST'])
def category_list(request,id=None):
    if request.method == "GET":
        categories = list(Category.objects.all().values())
        context = {
            'categories': categories
        }
        time.sleep(2)
        return JsonResponse(context, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        category = Category.objects.get(id=id)
        category.delete()
        return JsonResponse({'message' : "Successfully deleted"}, status=status.HTTP_200_OK)
    
    elif request.method == "POST":
        category = Category.objects.create(name=request.data['name'],description=request.data['description'])
        if category :
            time.sleep(2)
            return JsonResponse({'message' : "Successfully Created"}, status=status.HTTP_200_OK)
        time.sleep(2)
        return JsonResponse({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)

            
    
    return JsonResponse({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)

