from django.http import JsonResponse, HttpResponse
from .models import Product, Category
from django.shortcuts import get_object_or_404

def home(request):
    return HttpResponse("<h1>Добро пожаловать</h1>")

def product_list(request):
    products = Product.objects.all()
    data = [
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "description": p.description,
            "count": p.count,
            "is_active": p.is_active,
            "category": p.category.id
        } 
        for p in products
    ]
    return JsonResponse(data, safe=False)

def product_detail(request, id):
    p = get_object_or_404(Product, id=id)
    data = {
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "description": p.description,
        "count": p.count,
        "is_active": p.is_active,
        "category": p.category.id
    }
    return JsonResponse(data)

def category_list(request):
    categories = Category.objects.all()
    data = [{"id": c.id, "name": c.name} for c in categories]
    return JsonResponse(data, safe=False)

def category_detail(request, id):
    c = get_object_or_404(Category, id=id)
    data = {"id": c.id, "name": c.name}
    return JsonResponse(data)

def products_by_category(request, id):
    c = get_object_or_404(Category, id=id)
    products = c.products.all()
    data = [
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "description": p.description,
            "count": p.count,
            "is_active": p.is_active
        }
        for p in products
    ]
    return JsonResponse(data, safe=False)