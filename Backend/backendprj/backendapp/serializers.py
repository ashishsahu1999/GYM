#serializers
from rest_framework import serializers,viewsets
from django.contrib.auth.models import User
from .models import (Enquiry, Plan, Equipment, Members)
from datetime import date
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        if not attrs.get('username'):
            raise serializers.ValidationError({"username": "Username is required."})

        if not attrs.get('password'):
            raise serializers.ValidationError({"password": "Password is required."})

        return attrs

# Enquiry Serializer
class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = '__all__'

# Plan Serializer
class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

# Equipment Serializer
class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'

    # Custom validation for purchaseDate
    def validate_purchasedate(self, value):
        if value > date.today():  # Ensures that the purchase date is not in the future
            raise serializers.ValidationError("Purchase date cannot be in the future.")
        return value

# Member Serializer
class MemberSerializer(serializers.ModelSerializer):
    plan = serializers.PrimaryKeyRelatedField(queryset=Plan.objects.all())

    class Meta:
        model = Members
        fields = '__all__'  # All fields including plan, name, contact, etc.


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Members.objects.all()
    serializer_class = MemberSerializer
