#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Avg
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class CustomUser(AbstractUser):
    first_name = models.CharField(db_column='First_Name', max_length=15, null=False,
                                  blank=False)  # Field name made lowercase.
    middle_name = models.CharField(db_column='Middle_Name', max_length=15, blank=True,
                                   null=True)  # Field name made lowercase.
    last_name = models.CharField(db_column='Last_Name', max_length=25, null=False,
                                 blank=False)  # Field name made lowercase.
    # Field name made lowercase.
    birth_date = models.DateField(db_column='Birth_Date', null=True)
    provider_level = models.IntegerField(db_column='Provider_Level', blank=True, null=True,
                                         default=0)  # Field name made lowercase.
    last_payment_date = models.DateField(db_column='Last_Payment_Date', blank=True,
                                         null=True)  # Field name made lowercase.
    interests = models.ManyToManyField("upost.Interest", blank=True)
    subscriptions = models.ManyToManyField(
        "upost.ContentChannel", through="upost.Subscribe")
    attends = models.ManyToManyField(
        "upost.PostEvent", through="upost.Attend", related_name="attendee")
    rates = models.ManyToManyField(
        "upost.PostEvent", through="upost.Rate", related_name="rater")
    attendance_strikes = models.ManyToManyField("upost.PostEvent", through="upost.AttendanceStrike",
                                                related_name="attendee_to_strike")
    views = models.ManyToManyField("upost.Post", through="upost.View")
    # was incentive package before
    uses = models.ManyToManyField("upost.PostEvent", through="upost.UsedBy")
    community = models.ManyToManyField("upost.Community", blank=True)

    is_superuser = models.NullBooleanField(default=False)
    is_staff = models.NullBooleanField(default=False)

    class Meta:
        db_table = 'CustomUser'

    def calculate_avg_rating(self):
        return self.user_posts.post_event.ratings.all().aggregate(Avg('event_rating'))

    # @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    # def create_auth_token(sender, instance=None, created=False, **kwargs):
    #     if created:
    #         Token.objects.create(user=instance)
