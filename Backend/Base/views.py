from django.http import JsonResponse
from django.shortcuts import render
from .models import Category, Product
from rest_framework.decorators import api_view
from rest_framework import status 


# Create your views here.
@api_view(['GET', 'DELETE'])
def category_list(request,id=None):
    if request.method == "GET":
        categories = list(Category.objects.all().values())
        context = {
            'categories': categories
        }
        import time
        time.sleep(1)
        return JsonResponse(context, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        category = Category.objects.get(id=id)
        import time
        time.sleep(1)
        category.delete()
        return JsonResponse({'message' : "Successfully sfsfsfs"})
    
    return JsonResponse({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)

