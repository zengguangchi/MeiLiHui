from django.db import models

class User(models.Model):
    username=models.CharField(max_length=50)
    passwrod=models.CharField(max_length=50)
    token=models.CharField(max_length=200 )

class Lunbo(models.Model):
    img=models.CharField(max_length=200)

# class Men(models.Model):
#     id=models.CharField(max_length=20)
