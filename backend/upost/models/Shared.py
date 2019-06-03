#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.db import models


class Interest(models.Model):
    interest_tag = models.CharField(db_column='Interest_tag', primary_key=True,
                                    max_length=50)  # Field name made lowercase.
    description = models.CharField(max_length=50, default="description")
    image = models.ImageField(upload_to='interests', null=True)

    def __str__(self):
        return self.interest_tag

    class Meta:
        db_table = 'interest'
