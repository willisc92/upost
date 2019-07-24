#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.db import models


class Attend(models.Model):
    Attendance_options = (("Pending", "Pending"),
                          ("Attended", "Attended"),
                          ("No Showed", "No Showed"))

    attendID = models.AutoField(
        primary_key=True, db_column="attend_ID", blank=True)
    event = models.ForeignKey('upost.PostEvent', models.CASCADE, db_column='Event_ID',
                              related_name="event_to_attend")  # Field name made lowercase.
    attendee = models.ForeignKey('upost.CustomUser', models.DO_NOTHING, db_column='User_ID',
                                 related_name="attendee")  # Field name made lowercase.
    attendance_status = models.CharField(
        max_length=20, choices=Attendance_options, default=Attendance_options[0][0])

    class Meta:
        db_table = 'attend'
        unique_together = (('event', 'attendee'),)


class AttendanceStrike(models.Model):
    STRIKE_OPTIONS = ((1, 1),)

    strike_id = models.AutoField(primary_key=True, db_column="strike_ID")

    post = models.ForeignKey('upost.PostEvent', models.DO_NOTHING,
                             db_column='Post_ID')  # Field name made lowercase.
    user_to_strike = models.ForeignKey('upost.CustomUser', models.DO_NOTHING,
                                       db_column='User_ID')  # Field name made lowercase.
    # Field name made lowercase.
    strike = models.IntegerField(db_column='Strike', choices=STRIKE_OPTIONS)

    class Meta:
        db_table = 'attendance_strike'
        unique_together = (('post', 'user_to_strike'),)


class Rate(models.Model):
    RATE_OPTIONS = ((0, 0),
                    (1, 1),
                    (2, 2),
                    (3, 3),
                    (4, 4),
                    (5, 5))

    rate_id = models.AutoField(primary_key=True, db_column='rate_ID')
    post = models.ForeignKey('upost.PostEvent', models.CASCADE,
                             db_column='Post_ID', related_name="ratings")  # Field name made lowercase.
    user = models.ForeignKey('upost.CustomUser', models.DO_NOTHING,
                             db_column='User_ID')  # Field name made lowercase.
    # Field name made lowercase.
    event_rating = models.IntegerField(
        db_column='Event_Rating', choices=RATE_OPTIONS)

    class Meta:
        db_table = 'rates'
        unique_together = (('post', 'user'),)


class Subscribe(models.Model):
    subscribe_id = models.AutoField(primary_key=True, db_column="subscribe_id")
    # Field name made lowercase.
    subscription_date = models.DateField(
        db_column='Subscription_Date', auto_now_add=True)
    unsubscribe_date = models.DateField(db_column='Unsubscribe_date', blank=True,
                                        null=True)  # Field name made lowercase.
    channel = models.ForeignKey("upost.ContentChannel", models.CASCADE,
                                db_column='Channel_ID', related_name="channel_subscription")  # Field name made lowercase.
    community_member = models.ForeignKey('upost.CustomUser', models.DO_NOTHING,
                                         db_column='Community_Member_ID')  # Field name made lowercase.

    class Meta:
        db_table = 'subscribe'
        unique_together = (('channel', 'community_member'),)


class UsedBy(models.Model):
    RATE_OPTIONS = ((0, 0),
                    (1, 1),
                    (2, 2),
                    (3, 3),
                    (4, 4),
                    (5, 5))

    usedbyID = models.AutoField(primary_key=True, db_column="usedbyID")
    # Field name made lowercase. was incentive before
    post = models.ForeignKey(
        'PostEvent', models.DO_NOTHING, db_column='Post_ID')
    user = models.ForeignKey('upost.CustomUser', models.DO_NOTHING,
                             db_column='User_ID')  # Field name made lowercase.
    wellbeing_comment = models.CharField(db_column='Wellbeing_comment', max_length=500, blank=True,
                                         null=True)  # Field name made lowercase.
    wellbeing_input = models.IntegerField(db_column='Wellbeing_input',
                                          choices=RATE_OPTIONS)  # Field name made lowercase.

    class Meta:
        db_table = 'used_by'
        unique_together = (('user', 'post'),)


class View(models.Model):
    viewID = models.AutoField(primary_key=True, db_column="viewID")
    # Field name made lowercase.
    post = models.ForeignKey('Post', models.DO_NOTHING, db_column='Post_ID')
    user = models.ForeignKey('upost.CustomUser', models.DO_NOTHING,
                             db_column='User_ID')  # Field name made lowercase.
    # Field name made lowercase.
    view_time_stamp = models.DateTimeField(
        db_column='view_Time_Stamp', auto_now_add=True)

    class Meta:
        db_table = 'view'
        unique_together = (('user', 'post', 'view_time_stamp'),)
