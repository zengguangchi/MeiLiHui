import hashlib
import random
import time
from django.shortcuts import render, redirect

# Create your views here.
from meilihuiapp.models import User


def index(request):
    token = request.session.get('token')
    users = User.objects.filter(token=token)
    if users.count():
        users = users.first()

    else:
        users = None
    # username=request.COOKIES.get('username')
    return render(request, 'index.html', context={'users':users })



def getattr_token():
    token=str(time.time())+str(random.random())
    m=hashlib.md5()
    m.update(token.encode('utf8'))
    return m.hexdigest()


def getattr_password(password):
    hast=hashlib.md5()
    hast.update(password.encode('utf8'))
    return hast.hexdigest()



def regsiter(request):
    if request.method=="GET":
        return render(request, 'regsiter.html')
    elif request.method=='POST':
        user=User()
        user.username=request.POST.get('username')
        user.passwrod=request.POST.get("passWordtext")
        user.token=getattr_token()
        user.save()
        response=redirect('mlh:index')
        response.sesstion['token']=user.token
        return response


def login(request):
    return render(request,'login.html')


def logout(request):
    return render(request,'index.html')