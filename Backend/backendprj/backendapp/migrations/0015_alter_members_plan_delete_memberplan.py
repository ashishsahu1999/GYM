# Generated by Django 4.2.10 on 2024-11-20 07:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backendapp', '0014_memberplan_alter_members_plan'),
    ]

    operations = [
        migrations.AlterField(
            model_name='members',
            name='plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backendapp.plan'),
        ),
        migrations.DeleteModel(
            name='MemberPlan',
        ),
    ]