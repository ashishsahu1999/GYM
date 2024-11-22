# Generated by Django 4.2.10 on 2024-11-19 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapp', '0012_equipment_member'),
    ]

    operations = [
        migrations.CreateModel(
            name='Members',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('contact', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=50, null=True)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=10, null=True)),
                ('plan', models.CharField(choices=[('Basic Plan', 'Basic Plan'), ('Premium Plan', 'Premium Plan'), ('VIP Plan', 'VIP Plan')], max_length=100, null=True)),
                ('joindate', models.DateField()),
                ('initamount', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Member',
        ),
    ]