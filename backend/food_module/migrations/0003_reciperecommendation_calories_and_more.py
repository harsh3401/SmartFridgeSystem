# Generated by Django 4.1.5 on 2023-01-11 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("food_module", "0002_userfooditem_created_at_userfooditem_updated_at"),
    ]

    operations = [
        migrations.AddField(
            model_name="reciperecommendation",
            name="calories",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="reciperecommendation",
            name="carbohydrates",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="reciperecommendation",
            name="protein",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="reciperecommendation",
            name="saturated_fat",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="reciperecommendation",
            name="sodium",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="reciperecommendation",
            name="sugar",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="reciperecommendation",
            name="total_fat",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]