#serializers
from rest_framework import serializers,viewsets
from django.contrib.auth.models import User
from .models import (PostSignup, Enquiry, Plan, Equipment, Members, PasswordRecoveryRequest)
from datetime import date
from django.contrib.auth import authenticate

class UserSignupSerializer(serializers.ModelSerializer):
    mobile = serializers.CharField(max_length=15)
    gender = serializers.CharField(max_length=10)
    dob = serializers.DateField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'mobile', 'gender', 'dob']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        mobile = validated_data.pop('mobile')
        gender = validated_data.pop('gender')
        dob = validated_data.pop('dob')

        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        PostSignup.objects.create(
            user=user,
            mobile=mobile,
            gender=gender,
            dob=dob
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        # Authenticate the user using Django's built-in authenticate method
        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid username or password.")

        # If authentication is successful, return the user object
        attrs['user'] = user
        return attrs

# PasswordRecoveryRequestSerializer
class PasswordRecoveryRequestSerializer(serializers.ModelSerializer):
    user = serializers.CharField(write_only=True)  # We'll accept username to find the user

    class Meta:
        model = PasswordRecoveryRequest
        fields = ['user', 'email', 'mobile', 'dob']

    def validate_user(self, value):
        try:
            user = User.objects.get(username=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")
        return user

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
