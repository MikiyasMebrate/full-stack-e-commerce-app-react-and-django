from django.shortcuts import render
from .models import Category, Product
# Create your views here.
def index(request):
    return render(request, 'index.html')