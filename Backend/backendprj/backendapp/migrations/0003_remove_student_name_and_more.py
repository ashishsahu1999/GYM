# Generated by Django 5.0.6 on 2024-05-31 02:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backendapp', '0002_alter_student_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='name',
        ),
        migrations.RenameField(
            model_name='employee',
            old_name='address',
            new_name='confirm_password',
        ),
        migrations.RenameField(
            model_name='employee',
            old_name='age',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='employee',
            old_name='name',
            new_name='fullname',
        ),
        migrations.RenameField(
            model_name='employee',
            old_name='salary',
            new_name='password',
        ),
        migrations.DeleteModel(
            name='MyUser',
        ),
        migrations.DeleteModel(
            name='Student',
        ),
    ]
