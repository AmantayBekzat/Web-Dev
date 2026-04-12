from django.http import JsonResponse, HttpResponse
from django.db import IntegrityError
from .models import Product, Category
from django.core.exceptions import ValidationError

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
    try:
        p = Product.objects.get(id=id)
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
    except Product.DoesNotExist:
        return JsonResponse({"error": "Product not found"}, status=404)


def category_list(request):
    categories = Category.objects.all()
    data = [{"id": c.id, "name": c.name} for c in categories]
    return JsonResponse(data, safe=False)


def category_detail(request, id):
    try:
        c = Category.objects.get(id=id)
        data = {"id": c.id, "name": c.name}
        return JsonResponse(data)
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found"}, status=404)


def products_by_category(request, id):
    try:
        c = Category.objects.get(id=id)
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
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found"}, status=404)


def create_product(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        price = request.POST.get('price')
        description = request.POST.get('description')
        count = request.POST.get('count')
        is_active = request.POST.get('is_active')
        category_id = request.POST.get('category')

        try:
            price = float(price)
            if price <= 0:
                raise ValidationError("Price must be greater than 0")
        except (ValueError, TypeError):
            return JsonResponse({"error": "Invalid price value"}, status=400)

        if Product.objects.filter(name=name).exists():
            return JsonResponse({"error": "Product name already exists"}, status=400)

        try:
            product = Product.objects.create(
                name=name,
                price=price,
                description=description,
                count=int(count),
                is_active=is_active.lower() == 'true',
                category_id=category_id
            )
            return JsonResponse({
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "description": product.description,
                "count": product.count,
                "is_active": product.is_active,
                "category": product.category.id
            }, status=201)
        except IntegrityError as e:
            return JsonResponse({"error": f"Integrity error: {str(e)}"}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)