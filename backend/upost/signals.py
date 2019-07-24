from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from upost_api.settings import DOMAIN_NAME
from .models import *

from django_rest_passwordreset.signals import reset_password_token_created
from oauth2_provider.models import AccessToken
from django.db.models.signals import post_save
from datetime import datetime


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}/{}".format('password_reset', reset_password_token.key),
        'domain': DOMAIN_NAME
    }

    # render email text
    email_html_message = render_to_string(
        'email/user_reset_password.html', context)
    email_plaintext_message = render_to_string(
        'email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for UPost Account",
        # message:
        email_plaintext_message,
        # from:
        "UPost Team <noreply@upostwebsite.com>",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


@receiver(post_save, sender=AccessToken, dispatch_uid="record_last_login")
def record_login(sender, instance, created, **kwargs):
    if created:
        instance.user.last_login = datetime.now()
        instance.user.save()


@receiver(pre_save, sender=ContentChannel)
def update_deleted_flags_on_channel_save(sender, instance, **kwargs):
    if instance.pk:
        old_Channel = ContentChannel.objects.get(pk=instance.pk)
        # Channel is "deleted" - delete all posts, events, and incentives tied to channel.
        if old_Channel.deleted_flag is False and instance.deleted_flag is True:
            for post in instance.channel_posts.all():
                post.deleted_flag = instance.deleted_flag
                post.deletion_date = instance.deletion_date
                post.save()

        # If Channel is "restored" - restore all posts, events, and incentives tied to channel.
        if old_Channel.deleted_flag is True and instance.deleted_flag is False:
            for post in instance.channel_posts.all():
                post.deleted_flag = instance.deleted_flag
                post.deletion_date = None
                post.save()


@receiver(pre_save, sender=Post)
def update_deleted_flags_on_post_save(sender, instance, **kwargs):
    if instance.pk:
        old_Post = Post.objects.get(pk=instance.pk)
        # Post is "deleted" - delete all events and incentive tied to post.
        if old_Post.deleted_flag is False and instance.deleted_flag is True:
            for event in instance.post_events.all():
                event.deleted_flag = instance.deleted_flag
                event.deletion_date = instance.deletion_date
                event.save()
            try:
                if instance.post_incentive:
                    incentive = instance.post_incentive
                    incentive.deleted_flag = instance.deleted_flag
                    incentive.deletion_date = instance.deletion_date
                    incentive.save()
            except ObjectDoesNotExist:
                pass

        # Post is "restored" - restore all events and incentive tied to post.
        if old_Post.deleted_flag is True and instance.deleted_flag is False:
            for event in instance.post_events.all():
                event.deleted_flag = instance.deleted_flag
                event.deletion_date = None
                event.save()
            try:
                if instance.post_incentive:
                    incentive = instance.post_incentive
                    incentive.deleted_flag = instance.deleted_flag
                    incentive.deletion_date = None
                    incentive.save()
            except ObjectDoesNotExist:
                pass


@receiver(pre_save, sender=PostEvent)
def update_deleted_flags_on_event_save(sender, instance, **kwargs):
    if instance.pk:
        old_Event = PostEvent.objects.get(pk=instance.pk)
        # Event is "deleted" - delete incentive tied to event.
        if old_Event.deleted_flag is False and instance.deleted_flag is True:
            try:
                if instance.event_incentive:
                    incentive = instance.event_incentive
                    incentive.deleted_flag = instance.deleted_flag
                    incentive.deletion_date = instance.deletion_date
                    incentive.save()
            except ObjectDoesNotExist:
                pass
        # Event is "restored" - restore incentive tied to event.
        if old_Event.deleted_flag is True and instance.deleted_flag is False:
            try:
                if instance.event_incentive:
                    incentive = instance.event_incentive
                    incentive.deleted_flag = instance.deleted_flag
                    incentive.deletion_date = None
                    incentive.save()
            except ObjectDoesNotExist:
                pass


@receiver(pre_save, sender=Post)
def update_channel_update_timestamps(sender, instance, **kwargs):
    # Check if this is an existing post
    if instance.pk:
        old_Post = Post.objects.get(pk=instance.pk)
        # Check if save is a result of deleted_flag cascade
        if old_Post.channel.deleted_flag is not instance.channel.deleted_flag:
            pass
        else:
            old_Post.channel.save()
    # This is a new event - save the post as well.
    else:
        instance.channel.save()


@receiver(pre_save, sender=PostEvent)
def update_post_update_timestamps(sender, instance, **kwargs):
    # Check if this is an existing event
    if instance.pk:
        old_Event = PostEvent.objects.get(pk=instance.pk)
        # Check if save is a result of deleted_flag cascade
        if old_Event.post.deleted_flag is not instance.post.deleted_flag:
            pass
        else:
            old_Event.post.save()
    # This is a new event - save the post as well.
    else:
        instance.post.save()


@receiver(pre_save, sender=IncentivePackage)
def update_post_and_event_update_timestamps(sender, instance, **kwargs):

    # Check if this is an existing incentive
    if instance.pk:
        old_Incentive = IncentivePackage.objects.get(pk=instance.pk)
        old_event = old_Incentive.event
        new_event = instance.event
        old_post = old_Incentive.post
        new_post = instance.post
        # Check if incentive has event
        if old_event and new_event:
            # Check if signal is a result of event delete
            if old_event.deleted_flag is not new_event.deleted_flag:
                pass
            else:
                old_event.save()

        # Check if it has a post
        if old_post and new_post:
            # Check if signal is a result of post delete
            if old_post.deleted_flag is not new_post.deleted_flag:
                pass
            else:
                old_post.save()

    # This is a new incentive - update the event or post.
    else:
        if instance.post:
            instance.post.save()
        if instance.event:
            instance.event.save()
