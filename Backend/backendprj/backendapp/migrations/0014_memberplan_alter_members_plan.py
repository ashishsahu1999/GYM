# Generated by Django 4.2.10 on 2024-11-19 12:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backendapp', '0013_members_delete_member'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Basic Plan', 'Basic Plan'), ('Premium Plan', 'Premium Plan'), ('VIP Plan', 'VIP Plan')], max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.AlterField(
            model_name='members',
            name='plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backendapp.memberplan'),
        ),
    ]
