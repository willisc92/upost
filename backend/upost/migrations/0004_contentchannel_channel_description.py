# Generated by Django 2.2.1 on 2019-05-30 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('upost', '0003_auto_20190529_2339'),
    ]

    operations = [
        migrations.AddField(
            model_name='contentchannel',
            name='channel_description',
            field=models.CharField(blank=True, db_column='Channel_Description', default='', max_length=500, null=True),
        ),
    ]
