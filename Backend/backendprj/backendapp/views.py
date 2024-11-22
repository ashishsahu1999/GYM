#views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.shortcuts import render, redirect
import random

from .models import PostSignup, PostLogin, Enquiry, Plan, Equipment, Members
from .serializers import (UserSignupSerializer, 
    LoginSerializer, 
    PasswordRecoveryRequestSerializer, 
    EnquirySerializer,
    PlanSerializer,
    EquipmentSerializer,
    MemberSerializer
    )


class PostSignupView(APIView):
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        users = PostSignup.objects.all()
        serializer = UserSignupSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                PostLogin.objects.create(
                    user=user, success=True, ip_address=request.META.get('REMOTE_ADDR'))
                return Response({'msg': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# PasswordRecoveryView
class PasswordRecoveryView(APIView):
    def post(self, request):
        # Deserialize the incoming data
        serializer = PasswordRecoveryRequestSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the recovery request
            recovery_request = serializer.save()

            # Send email to the user for password recovery
            send_mail(
                'Password Recovery Request',
                'Click here to reset your password.',
                settings.DEFAULT_FROM_EMAIL,
                [recovery_request.email],
                fail_silently=False,
            )

            return Response({"message": "Password recovery email sent."}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''Enquiry Views'''
# Add Enquiry
class AddEnquiryView(APIView):
    def post(self, request):
        serializer = EnquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Enquiry added successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#View Enquiry List
class EnquiryListView(APIView):
    def get(self, request):
        enquiries = Enquiry.objects.all()
        serializer = EnquirySerializer(enquiries, many=True)
        return Response(serializer.data)
    
# Edit Enquiry (PUT request)
class EditEnquiryView(APIView):
    def get_object(self, id):
        """Helper method to get enquiry object by ID."""
        try:
            return Enquiry.objects.get(id=id)
        except Enquiry.DoesNotExist:
            return None

    def put(self, request, id):
        enquiry = self.get_object(id)
        if not enquiry:
            return Response({'msg': 'Enquiry not found!'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EnquirySerializer(enquiry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Enquiry updated successfully!'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Enquiry (DELETE request)
class DeleteEnquiryView(APIView):
   
    def get_object(self, id):
       
        """Helper method to get enquiry object by ID."""
        try:
            return Enquiry.objects.get(id=id)
        except Enquiry.DoesNotExist:
            return None

    def delete(self, request, id):
        enquiry = self.get_object(id)
        if not enquiry:
            return Response({'msg': 'Enquiry not found!'}, status=status.HTTP_404_NOT_FOUND)

        enquiry.delete()
        return Response({'msg': 'Enquiry deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


'''Plan Views'''
# Add Plan
class AddPlanView(APIView):
    def post(self, request):
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Plan added successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#View Plan List
class PlanListView(APIView):
    def get(self, request):
        enquiries = Plan.objects.all()
        serializer = PlanSerializer(enquiries, many=True)
        return Response(serializer.data)
    
# Edit Plan (PUT request)
class EditPlanView(APIView):
    def get_object(self, id):
        """Helper method to get plan object by ID."""
        try:
            return Plan.objects.get(id=id)
        except Plan.DoesNotExist:
            return None

    def put(self, request, id):
        plan = self.get_object(id)  
        if not plan:
            return Response({'msg': 'Plan not found!'}, status=status.HTTP_404_NOT_FOUND)

        # Pass the existing plan instance to the serializer
        serializer = PlanSerializer(plan, data=request.data) 
        if serializer.is_valid():
            serializer.save()  # This will save the updated instance
            return Response({'msg': 'Plan updated successfully!'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Plan (DELETE request)
class DeletePlanView(APIView):
   
    def get_object(self, id):
       
        """Helper method to get Plan object by ID."""
        try:
            return Plan.objects.get(id=id)
        except Plan.DoesNotExist:
            return None

    def delete(self, request, id):
        plan = self.get_object(id)
        if not plan:
            return Response({'msg': 'Plan not found!'}, status=status.HTTP_404_NOT_FOUND)

        plan.delete()
        return Response({'msg': 'Plan deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


'''Equipment Views'''
# Add Equipment
class AddEquipmentView(APIView):
    def post(self, request):
        serializer = EquipmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Equipment added successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#View Equipment List
class EquipmentListView(APIView):
    def get(self, request):
        equipment = Equipment.objects.all()
        serializer = EquipmentSerializer(equipment, many=True)
        return Response(serializer.data)
    
# Edit Equipment (PUT request)
class EditEquipmentView(APIView):
    def get_object(self, id):
        """Helper method to get plan object by ID."""
        try:
            return Equipment.objects.get(id=id)
        except Equipment.DoesNotExist:
            return None

    def put(self, request, id):
        plan = self.get_object(id)  
        if not plan:
            return Response({'msg': 'Equipment not found!'}, status=status.HTTP_404_NOT_FOUND)

        # Pass the existing plan instance to the serializer
        serializer = EquipmentSerializer(plan, data=request.data) 
        if serializer.is_valid():
            serializer.save()  # This will save the updated instance
            return Response({'msg': 'Equipment updated successfully!'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Equipment (DELETE request)
class DeleteEquipmentView(APIView):
   
    def get_object(self, id):
       
        """Helper method to get Equipment object by ID."""
        try:
            return Equipment.objects.get(id=id)
        except Equipment.DoesNotExist:
            return None

    def delete(self, request, id):
        plan = self.get_object(id)
        if not plan:
            return Response({'msg': 'Equipment not found!'}, status=status.HTTP_404_NOT_FOUND)

        plan.delete()
        return Response({'msg': 'Equipment deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


'''Members Views'''
# Add Members
class AddMembersView(APIView):
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Members added successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#View Members List
class MembersListView(APIView):
    def get(self, request):
        member = Members.objects.all()
        serializer = MemberSerializer(member, many=True)
        return Response(serializer.data)
    
# Edit Members (PUT request)
class EditMembersView(APIView):
    def get_object(self, id):
        """Helper method to get member object by ID."""
        try:
            return Members.objects.get(id=id)
        except Members.DoesNotExist:
            return None

    def put(self, request, id):
        member = self.get_object(id)  # Get member by ID
        if not member:
            return Response({'msg': 'Member not found!'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the plan ID is being passed in the request
        plan_id = request.data.get('plan')
        if plan_id:
            try:
                plan = Plan.objects.get(id=plan_id)  # Validate plan ID
                request.data['plan'] = plan.id  # Set the plan ID, not the full object
            except Plan.DoesNotExist:
                return Response({'msg': 'Plan not found!'}, status=status.HTTP_400_BAD_REQUEST)

        # Use the serializer to validate and save the data
        serializer = MemberSerializer(member, data=request.data, partial=True)  # Use partial update
        if serializer.is_valid():
            serializer.save()  # This will save the updated member instance
            return Response({'msg': 'Member updated successfully!'}, status=status.HTTP_200_OK)

        # If serializer is invalid, return the error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete Members (DELETE request)
class DeleteMembersView(APIView):
   
    def get_object(self, id):
       
        """Helper method to get Members object by ID."""
        try:
            return Members.objects.get(id=id)
        except Members.DoesNotExist:
            return None

    def delete(self, request, id):
        plan = self.get_object(id)
        if not plan:
            return Response({'msg': 'Members not found!'}, status=status.HTTP_404_NOT_FOUND)

        plan.delete()
        return Response({'msg': 'Members deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)