
from django.urls import path
from . import views
from api.views import home

urlpatterns = [
    path('', views.home),
    path('products/', views.product_list),
    path('products/<int:id>/', views.product_detail),
    path('categories/', views.category_list),
    path('categories/<int:id>/', views.category_detail),
    path('categories/<int:id>/products/', views.products_by_category),
    path('create_product/', views.create_product),
]