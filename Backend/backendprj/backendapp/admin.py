
# Register your models here.
from django.contrib import admin
from .models import *

admin.site.register(PostSignup)
admin.site.register(PostLogin)
admin.site.register(PasswordRecoveryRequest)
admin.site.register(Enquiry)
admin.site.register(Plan)
admin.site.register(Equipment)
admin.site.register(Members)