# Generated by Django 5.0.6 on 2024-05-31 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapp', '0003_remove_student_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='confirm_password',
            field=models.IntegerField(max_length=100),
        ),
        migrations.AlterField(
            model_name='employee',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
