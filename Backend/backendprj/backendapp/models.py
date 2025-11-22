from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


''' Enquiry Model  ''' 
class Enquiry(models.Model):
    name = models.CharField(max_length=150, null=True)
    mobile = models.CharField(max_length=15, null=True)
    email = models.CharField(max_length=50, null=True)
    age = models.CharField(max_length=15, null=True)
    gender = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.name
    
''' Plan Model '''
class Plan(models.Model):
    name = models.CharField(max_length=150, null=True)
    amount = models.CharField(max_length=15, null=True)
    duration = models.CharField(max_length=15, null=True)

    def __str__(self):
        return self.name
    
''' Members Model  '''
GENDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
]

class Members(models.Model):
    name = models.CharField(max_length=150)
    contact = models.CharField(max_length=15)
    email = models.EmailField(max_length=50, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, null=True)  
    joindate = models.DateField()
    initamount = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    def __str__(self):
        return self.name
    
    # Optionally, you can create a method to display the plan name and amount
    def plan_details(self):
        return f"{self.plan.name} (₹{self.plan.amount})"


''' Equipment Model  '''
class Equipment(models.Model):
    name = models.CharField(max_length=150, null=True)
    price = models.CharField(max_length=100, null=True)
    unit = models.CharField(max_length=50, null=True)
    purchasedate = models.DateField(null=True)
    description = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name
