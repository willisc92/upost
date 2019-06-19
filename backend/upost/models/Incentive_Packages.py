#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.db import models


class DietOption(models.Model):
    diet_option = models.CharField(
        db_column="Dietary_option", max_length=50, primary_key=True)

    def __str__(self):
        return self.diet_option

    class Meta:
        db_table = 'diet_options'


class IncentivePackage(models.Model):
    incentive_package_id = models.AutoField(db_column = "incentive_package_id", primary_key=True);
    post = models.ForeignKey(
        "upost.Post", on_delete=models.CASCADE, related_name="post_incentives")
    incentive_type = models.ForeignKey(
        "upost.IncentiveChoice", on_delete=models.DO_NOTHING)
    ip_description = models.CharField(
        db_column='Ip_description', max_length=500)
    planned_start_date = models.DateTimeField(
        db_column='Planned_start_datetime', null=False, blank=False)
    planned_end_date = models.DateTimeField(
        db_column='Planned_end_datetime', null=False, blank=False)
    diet_option = models.ManyToManyField(
        "upost.DietOption", db_table='incentive_package_diet_option'
    )

    class Meta:
        db_table = 'incentive_package'


class IncentiveChoice(models.Model):
    incentive_name = models.CharField(
        db_column='incentive_name', primary_key=True, max_length=100)

    class Meta:
        db_table = 'incentive_type'