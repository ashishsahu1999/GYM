from django.urls import path
from .views import some_view, another_view  # Import views specific to backendapp

urlpatterns = [
    path('some-endpoint/', some_view, name='some_view'),
    path('another-endpoint/', another_view, name='another_view'),
]
