from django.http import JsonResponse
from django.shortcuts import render
from .models import Category, Product
from rest_framework.decorators import api_view
from rest_framework import status 
from rest_framework.response import Response
import time


# Create your views here.
@api_view(['GET', 'DELETE', 'POST'])
def category_list(request,id=None):
    if request.method == "GET":
        categories = list(Category.objects.all().values())
        context = {
            'categories': categories
        }
        return Response(context, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        category = Category.objects.get(id=id)
        category.delete()
        return JsonResponse({'message' : "Successfully deleted"}, status=status.HTTP_200_OK)
    
    elif request.method == "POST":
        if id:
            print("update")
            print(request.data)
            category = Category.objects.get(id=id)
            category.name = request.data['name']
            category.description = request.data['description']
            category.save()
            return JsonResponse({'message' : "Category successfully updated "}, status=status.HTTP_200_OK)
        else:
            print("new")
            print(request.data)
            category = Category.objects.create(name=request.data['name'],description=request.data['description'])
            if category :
                return JsonResponse({'message' : "Category created successfully"}, status=status.HTTP_200_OK)

        return JsonResponse({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)

            
    
    return JsonResponse({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'DELETE', 'POST'])
def product_list(request, id=None):
    if request.method == "GET":

        print("Product Request GET")
        product = list(Product.objects.all().values())
        context = {
            'product' : product
        }
        
        return JsonResponse(context, status=status.HTTP_200_OK)