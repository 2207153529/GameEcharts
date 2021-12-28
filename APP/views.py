import json

from django.db.models import Count, Sum
from django.http import HttpResponse
from django.shortcuts import render
from django.views.csrf import csrf_failure

# Create your views here.
from APP.models import BojiangInfo, GameInfo, WebInfo, WebMovieInfo

# 主视图函数
def index(request):
    # 判断请求是否为GET，是GET请求则返回index页面
    if request.method == "GET":
        return render(request, 'index.html')


"""
以下函数均为各API函数，从数据库筛选数据，返回每个图表特定格式的数据
"""

def zb_page(request):
    bojiang = BojiangInfo.objects.order_by('-yc_gift_value')
    manName = []
    manMoney = []
    for info in bojiang[:15]:
        manName.append(info.name)
        manMoney.append(info.yc_gift_value)
    content = {
        'manName': manName,
        'manMoney': [int(i) for i in manMoney],
        "sum": int(sum(manMoney) / 3)
    }
    return HttpResponse(json.dumps(content, ensure_ascii=False), content_type='application/json,charset=utf-8')

@csrf_failure
def game_fenlei(request):
    gameinfo = GameInfo.objects.values('togglename').annotate(Count('togglename'))
    togglename = []
    count = []
    for info in gameinfo[:4]:
        togglename.append(info['togglename'])
        count.append(info['togglename__count'])
    content = {
        "togglename": togglename,
        'count': count
    }
    print(content)
    return HttpResponse(json.dumps(content, ensure_ascii=False), content_type='application/json, charset="utf-8"')


def game_num(request):
    gameinfo = GameInfo.objects.values('gamename').annotate(count=Count('gamename')).order_by('-count')
    gameName = []
    gameCount = []
    for i in gameinfo[:20]:
        gameName.append(i['gamename'])
        gameCount.append(i['count'])
    content = {
        'gameName': gameName,
        'gameCount': gameCount
    }
    return HttpResponse(json.dumps(content, ensure_ascii=False), content_type='application/json, charset="utf-8"')


def zb_line(request):
    # 提取前一百名主播信息
    bojiang = BojiangInfo.objects.filter(id__lt=100, id__gt=0)
    zbName = []
    # 用于存放主播活跃观众数量
    audience_count = []
    # 用于存放主播礼物人数
    gift_person_count = []
    for i in bojiang:
        zbName.append(i.name)
        audience_count.append(i.audience_count)
        gift_person_count.append(i.gift_person_count)
    content = {
        'zbName': zbName,
        "audience_count": audience_count,
        "gift_person_count": gift_person_count
    }
    return HttpResponse(json.dumps(content, ensure_ascii=False), content_type='application/json, charset="utf-8"')


def web_info(request):
    webInfo = WebInfo.objects.values('classname').annotate(sum=Sum('usernum')).order_by('-sum')
    WebInfo.objects.annotate()
    className = []
    count = []
    for info in webInfo[:10]:
        className.append(info['classname'])
        count.append(info['sum'])
    content = {
        'className': className,
        'count': count
    }
    return HttpResponse(json.dumps(content, ensure_ascii=False), content_type='application/json, charset="utf-8"')


def bar_data(request):
    webMovieInfo = WebMovieInfo.objects.values('classname').annotate(sum=Sum('usernum'))
    webname = []
    usernum = []
    pageInfo = WebMovieInfo.objects.values('webname').annotate(sum=Sum('usernum')).order_by('-sum')
    for page in pageInfo[:15]:
        webname.append(page['webname'])
        usernum.append(page['sum'])
    classname = []
    count = []
    for info in webMovieInfo:
        classname.append(info['classname'])
        count.append(info['sum'])
    content = {
        'classname': classname,
        'count': count,
        'webname': webname,
        'usernum': usernum
    }
    return HttpResponse(json.dumps(content, ensure_ascii=False), content_type='application/json, charset="utf-8"')