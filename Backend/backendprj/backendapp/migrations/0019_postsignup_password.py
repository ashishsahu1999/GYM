# Generated by Django 4.2.10 on 2024-11-22 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapp', '0018_postlogin_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='postsignup',
            name='password',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
