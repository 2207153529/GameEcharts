# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class BojiangInfo(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    time = models.CharField(db_column='Time', max_length=255)  # Field name made lowercase.
    gamename = models.CharField(db_column='GameName', max_length=255)  # Field name made lowercase.
    audience_count = models.IntegerField()
    danmu_count = models.IntegerField()
    danmu_person_count = models.IntegerField()
    yc_gift_value = models.FloatField()
    hn_max = models.IntegerField()
    gift_person_count = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'bojiang_info'


class GameInfo(models.Model):
    togglename = models.CharField(db_column='ToggleName', max_length=255)  # Field name made lowercase.
    gamename = models.CharField(db_column='GameName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    gamehot = models.CharField(db_column='GameHot', max_length=255, blank=True, null=True)  # Field name made lowercase.
    gameman = models.CharField(db_column='GameMan', max_length=255, blank=True, null=True)  # Field name made lowercase.
    gametitle = models.CharField(db_column='GameTitle', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'game_info'


class WebInfo(models.Model):
    webname = models.CharField(db_column='WebName', max_length=255)  # Field name made lowercase.
    classname = models.CharField(db_column='className', max_length=255)  # Field name made lowercase.
    usernum = models.IntegerField(db_column='UserNum')  # Field name made lowercase.
    growth = models.CharField(db_column='Growth', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'web_info'


class WebMovieInfo(models.Model):
    timename = models.CharField(db_column='TimeName', max_length=128)  # Field name made lowercase.
    webname = models.CharField(db_column='WebName', max_length=255)  # Field name made lowercase.
    classname = models.CharField(db_column='className', max_length=255)  # Field name made lowercase.
    usernum = models.IntegerField(db_column='UserNum')  # Field name made lowercase.
    growth = models.CharField(db_column='Growth', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'web_movie_info'
