#urls 
"""
URL configuration for backendprj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backendapp.views import (
    LoginView,
    AddEnquiryView,
    EnquiryListView,
    EditEnquiryView,
    DeleteEnquiryView,
    AddPlanView,
    PlanListView,
    EditPlanView,
    DeletePlanView,
    AddEquipmentView,
    EquipmentListView,
    EditEquipmentView,
    DeleteEquipmentView,
    AddMembersView,
    MembersListView,
    EditMembersView,
    DeleteMembersView,
    CountView
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/login/', LoginView.as_view(), name='login'),

    #enquiries
    path('api/enquiries/add/', AddEnquiryView.as_view(), name='add_enquiry'),
    path('api/enquiries/', EnquiryListView.as_view(), name='enquiry-list'),
    path('api/enquiries/<int:id>', EditEnquiryView.as_view(), name='edit-enquiry'),
    path('api/enquiries/<int:id>/delete/', DeleteEnquiryView.as_view(), name='delete-enquiry'),
    
    #plan
    path('api/plan/add/', AddPlanView.as_view(), name='add_plan'),
    path('api/plan/', PlanListView.as_view(), name='plan-list'),
    path('api/plan/<int:id>', EditPlanView.as_view(), name='edit-plan'),
    path('api/plan/<int:id>/delete/', DeletePlanView.as_view(), name='delete-plan'),
    
    #equipment
    path('api/equipment/add/', AddEquipmentView.as_view(), name='add_equipment'),
    path('api/equipment/', EquipmentListView.as_view(), name='equipment-list'),
    path('api/equipment/<int:id>', EditEquipmentView.as_view(), name='edit-equipment'),
    path('api/equipment/<int:id>/delete/', DeleteEquipmentView.as_view(), name='delete-equipment'),
    
    #members
    path('api/members/add/', AddMembersView.as_view(), name='add_members'),
    path('api/members/', MembersListView.as_view(), name='members-list'),
    path('api/members/<int:id>', EditMembersView.as_view(), name='edit-members'),
    path('api/members/<int:id>/delete/', DeleteMembersView.as_view(), name='delete-members'),

    #View Count
    path('api/viewcount/', CountView.as_view(), name='add_members'),

]
