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
        return Response({'message' : "Successfully deleted"}, status=status.HTTP_200_OK)
    
    elif request.method == "POST":
        if id:
            print("update")
            print(request.data)
            category = Category.objects.get(id=id)
            category.name = request.data['name']
            category.description = request.data['description']
            category.save()
            return Response({'message' : "Category successfully updated "}, status=status.HTTP_200_OK)
        else:
            print("new")
            print(request.data)
            category = Category.objects.create(name=request.data['name'],description=request.data['description'])
            if category :
                return Response({'message' : "Category created successfully"}, status=status.HTTP_200_OK)

        return Response({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)

            
    
    return Response({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'DELETE', 'POST'])
def product_list(request, id=None):
    if request.method == "GET":
        product = list(Product.objects.all().values('id','name', 'category_id','category__name', 'summary', 'description', 'price', 'cover', 'created_at', 'is_active'))
        context = {
            'product' : product
        }
        return Response(context, status=status.HTTP_200_OK)
    
    elif request.method == "POST":
        if id:
            category = Category.objects.get(pk = request.data['category'])
            product = Product.objects.get(pk = id)
            product.name=request.data['name']
            product.category=category
            product.summary = request.data['summary']
            product.description = request.data['description']

            try:
                product.cover = request.data['cover[]']
            except:
                product.cover = product.cover

            product.price = float(request.data['price'])
            product.is_active = True if request.data['is_active'] == 'true' else False  
            product.save()


      
            return Response({'message' : "Product successfully updated"}, status=status.HTTP_200_OK)
        else:
            category = Category.objects.get(pk = request.data['category'])
            product = Product.objects.create( name=request.data['name'],
                                              category = category, 
                                              summary = request.data['summary'],
                                              description = request.data['description'], 
                                              cover = request.data['cover[]'],
                                              price = request.data['price'],
                                              is_active = True if request.data['is_active'] == 'true' else False  )

        
        return Response({'message' : "Product successfully created"}, status=status.HTTP_200_OK)
    
    return Response({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET',])
def filter_product(request, id):
    if id != 'undefined':
        if request.method == "GET":
            products = list(Product.objects.filter(category__id = id).values())
            context = {
                'products' : products
            }
            return Response(context, status=status.HTTP_200_OK)
    return Response({'message': 'Method not allowed'}, status=status.HTTP_401_UNAUTHORIZED)
    

        


