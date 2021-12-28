from django.conf.urls import url

from APP import views

urlpatterns = [
    # 主页面url
    url('^index/', views.index, name='index'),
    # 主播信息API
    url('^zb_page/', views.zb_page, name='zb_page'),
    # 直播分类信息API
    url('^game_fenlei/', views.game_fenlei, name='game_fenlei'),
    # 直播数量信息API
    url('^game_num/', views.game_num, name='game_num'),
    # 线状图信息API
    url('^zb_line/', views.zb_line, name='zb_line'),
    # 网站点击量信息API
    url('^web_info/', views.web_info, name='web_info'),
    # 饼图信息API
    url('^bar_data/', views.bar_data, name='bar_data'),
]