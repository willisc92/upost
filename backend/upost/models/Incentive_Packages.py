#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.db import models


class DietOption(models.Model):
    diet_option = models.CharField(db_column="Dietary_option", max_length=50, primary_key=True)

    def __str__(self):
        return self.diet_option

    class Meta:
        db_table = 'diet_options'


class FoodDonation(models.Model):
    incentive_package = models.OneToOneField("upost.IncentivePackage", on_delete=models.CASCADE,
                                             primary_key=True, related_name="food")
    diet_option = models.ManyToManyField("upost.DietOption", db_table='food_donation_diet_option')

    planned_start_date = models.DateField(db_column='Planned_start_date',
                                          blank=False)  # Field name made lowercase.
    planned_start_time = models.TimeField(db_column='Planned_start_time',
                                          blank=False)  # Field name made lowercase.
    planned_end_date = models.DateField(db_column='Planned_end_date',
                                        blank=False)  # Field name made lowercase.
    planned_end_time = models.TimeField(db_column='Planned_end_time',
                                        blank=False)  # Field name made lowercase.

    class Meta:
        db_table = 'food_donation'


class IncentivePackage(models.Model):
    post = models.OneToOneField("upost.Post", on_delete=models.CASCADE, primary_key=True, related_name="incentive")
    is_marketing = models.BooleanField(db_column='Is_marketing')  # Field name made lowercase.
    is_food = models.BooleanField(db_column='Is_Food')  # Field name made lowercase.
    ip_description = models.CharField(db_column='Ip_description', max_length=500)  # Field name made lowercase.

    class Meta:
        db_table = 'incentive_package'


class Marketing(models.Model):
    incentive_package = models.OneToOneField("upost.IncentivePackage", on_delete=models.CASCADE,
                                             primary_key=True, related_name="marketing")
    planned_start_date = models.DateField(db_column='Planned_start_date',
                                          blank=False)  # Field name made lowercase.
    planned_start_time = models.TimeField(db_column='Planned_start_time',
                                          blank=False)  # Field name made lowercase.
    planned_end_date = models.DateField(db_column='Planned_end_date',
                                        blank=False)  # Field name made lowercase.
    planned_end_time = models.TimeField(db_column='Planned_end_time',
                                        blank=False)  # Field name made lowercase.

    class Meta:
        db_table = 'marketing'
