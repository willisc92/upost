#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.utils import timezone
from django.urls import reverse
from django.db import models
from django.db.models import Avg
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
from . import IncentivePackage


class ContentChannel(models.Model):
    channel_id = models.AutoField(db_column='Channel_ID', primary_key=True)
    user = models.ForeignKey('upost.CustomUser', on_delete=models.CASCADE,
                             db_column='USER_ID', related_name="channels")
    channel_name = models.CharField(
        db_column='Channel_Name', max_length=50, unique=True)
    deleted_flag = models.BooleanField(db_column='Deleted_Flag', default=False,
                                       blank=True)
    creation_date = models.DateTimeField(
        db_column='Creation_Date', auto_now_add=True)
    deletion_date = models.DateTimeField(
        db_column='Deletion_Date', blank=True, null=True)
    channel_description = models.CharField(
        db_column='Channel_Description', max_length=500, blank=True, null=True, default="")
    last_updated = models.DateTimeField(auto_now=True)
    picture = models.ImageField(
        null=True, blank=True, upload_to="channel_images/")

    def publish(self):
        self.creation_date = timezone.now()
        self.deleted_flag = False

    def __str__(self):
        return self.channel_name

    class Meta:
        db_table = 'content_channel'


class EventContent(models.Model):
    post_event = models.OneToOneField('upost.PostEvent', on_delete=models.CASCADE, primary_key=True,
                                      related_name="content")
    post_event_content = models.CharField(db_column='Post_Event_Content', max_length=200, blank=True,
                                          null=True)

    class Meta:
        db_table = 'event_content'


class Post(models.Model):
    post_id = models.AutoField(db_column='Post_ID', primary_key=True)
    post_title = models.CharField(
        db_column='Post_title', max_length=50, unique=True)
    poster_name = models.CharField(max_length=50)
    phone_number = models.CharField(db_column='Phone_number', max_length=10)
    email = models.EmailField(db_column='Email', max_length=50)
    post_description = models.CharField(
        db_column='Post_description', max_length=500)
    user = models.ForeignKey('upost.CustomUser', models.DO_NOTHING,
                             db_column='User_ID', related_name="user_posts")
    channel = models.ForeignKey(ContentChannel, models.CASCADE, db_column='Channel_ID',
                                related_name="channel_posts")
    post_timestamp = models.DateTimeField(auto_now_add=True)
    deleted_flag = models.BooleanField(
        db_column='Deleted_Flag', default=False, blank=True)
    tags = models.ManyToManyField("upost.Interest", db_table='post_tags')
    community = models.ForeignKey(
        "upost.Community", on_delete=models.DO_NOTHING, related_name="community_posts")
    picture = models.ImageField(
        null=True, blank=True, upload_to="post_images/")
    deletion_date = models.DateTimeField(
        db_column='Deletion_Date', blank=True, null=True)
    last_updated = models.DateTimeField(auto_now=True)

    def publish(self):
        self.creation_date = timezone.now()
        self.deleted_flag = False

    def __str__(self):
        return self.post_title

    class Meta:
        db_table = 'post'


class PostEvent(models.Model):
    event_id = models.AutoField(db_column='Event_id', primary_key=True)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="post_events")
    event_title = models.CharField(
        db_column='Event_title', max_length=50, null=True, blank=True)
    event_description = models.CharField(
        db_column='Event_description', max_length=500, null=True, blank=True)
    cost = models.IntegerField(
        db_column='Cost', blank=True, null=True, default=0)
    location = models.CharField(
        db_column='Location', max_length=50, null=False, blank=False)
    capacity = models.IntegerField(
        db_column='Capacity', null=False, blank=False)
    planned_start_date = models.DateTimeField(
        db_column='Planned_start_datetime', null=False, blank=False)
    planned_end_date = models.DateTimeField(
        db_column='Planned_end_datetime', null=False, blank=False)
    creation_date = models.DateTimeField(
        db_column='Creation_Date', auto_now_add=True)
    deletion_date = models.DateTimeField(
        db_column='Deletion_Date', blank=True, null=True)
    deleted_flag = models.BooleanField(
        db_column='Deleted_Flag', default=False, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def publish(self):
        self.creation_date = timezone.now()
        self.deleted_flag = False

    def has_post_event_content(self):
        return hasattr(self, 'content')

    def calculate_avg_rating(self):
        if self.ratings.all() is None:
            return "No ratings"
        else:
            return self.ratings.all().aggregate(Avg('event_rating'))

    class Meta:
        db_table = 'post_event'
