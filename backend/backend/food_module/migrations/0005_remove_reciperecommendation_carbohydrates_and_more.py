# Generated by Django 4.1.5 on 2023-01-11 19:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("food_module", "0004_reciperecommendation_steps"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="reciperecommendation",
            name="carbohydrates",
        ),
        migrations.RemoveField(
            model_name="reciperecommendation",
            name="saturated_fat",
        ),
    ]