import requests
from lxml import etree
import re
import random
from time import sleep
from selenium import webdriver
import pymysql
import json

# 随机头部信息
def set_header():
    pc_agent = [
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
        "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0);",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
        "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
        "Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
        "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11",
        "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; TencentTraveler 4.0)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; The World)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
        "Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0"
    ]
    return {"user-agent": random.choice(pc_agent)}

# 爬取斗鱼所有主播信息
class douyuSpider():
    def __init__(self):
        self.GameList_url = 'https://www.douyu.com/directory'
        self.driver = webdriver.PhantomJS()
        # 创建数据库连接引擎
        self.connent = pymysql.connect(user="root", port=3306, host="127.0.0.1", database="GameEcharts", password='cyh0110')
        # 创建数据库游标
        self.cur = self.connent.cursor()

    def get_resp(self, url):
        resp = requests.get(url, headers=set_header(), timeout=3)
        html = etree.HTML(resp.text)
        # 防止频繁发送请求，添加三秒以内的随机睡眠
        sleep(random.randint(0, 2) + random.randint(0, 10) / 10)
        return html

    def get_menu_whole(self, html):
        get_url_list = html.xpath("//div[@class='Aside-menu-head']/a[2]/@href")
        url_list = ["https://www.douyu.com" + url for url in get_url_list]
        # 获取直播类型信息
        title_list = [title for title in html.xpath("//a[@class='Aside-menu-title']//text()")]
        return title_list, url_list

    def get_infomation(self, url, ToggleName):
        driver = self.driver
        driver.get(url)
        last_index = 10
        now_index = 1
        info = []
        while last_index != now_index:
            sleep(2)
            html = etree.HTML(driver.page_source)
            # 获取当前页面所有直播间的块盒子
            banana_list = html.xpath("//div[@class='DyListCover-content']")
            # 循环所有块盒子
            for info in banana_list:
                # 获取直播游戏名
                GameName = re.sub("[.\'\"]", "", str(info.xpath(".//span[@class='DyListCover-zone']//text()")[0]))
                # 获取直播间热度
                GameHot = info.xpath(".//span[@class='DyListCover-hot']//text()")
                # 获取主播名
                GameMan = re.sub("[.\'\"]", "", str(info.xpath(".//div[@class='DyListCover-userName']//text()")[0]))
                # 获取直播间标题
                GameTitle = re.sub("[.\'\"]", "", str(info.xpath(".//div[@class='DyListCover-info']//h3/@title")[0]))
                # 转换数值，将带万的转换为INT格式
                if re.search("万", GameHot[0]):
                    GameHot = float(''.join(re.findall("[\d.]", GameHot[0])))*10000
                else:
                    GameHot = float(GameHot[0])
                print(ToggleName, GameName, int(GameHot), GameMan, GameTitle)
                # 存储进数据库
                sql = f"INSERT INTO game_info (ToggleName, GameName, GameHot, GameMan, GameTitle) values ('{ToggleName}', '{GameName}', '{int(GameHot)}', '{GameMan}', '{GameTitle}')"
                self.cur.execute(sql)
                self.connent.commit()
            # 运行js代码实现翻页
            driver.execute_script("document.querySelector('.dy-Pagination').lastChild.click();")
            # 当前页码+1
            now_index += 1
            # 每翻一页获取一次最后页的页码,避免页码发生改变
            last_index = driver.find_element_by_css_selector(".dy-Pagination").find_elements_by_tag_name('li')[-2].text
        return info


    def run(self):
        GameList_html = self.get_resp(self.GameList_url)
        GameTitle_list, GameList_url = self.get_menu_whole(GameList_html)
        print(GameTitle_list)
        for url in GameList_url[7:]:
            title = GameTitle_list[GameList_url.index(url)]
            info = self.get_infomation(url, title)
            print(info)

# 爬取虎牙所有主播信息
class HuyaSpider():
    def __init__(self):
        self.GameUrl = "https://www.huya.com/g/"
        # 配置webdriver
        self.driver = webdriver.PhantomJS()
        # 连接数据库
        self.connent = pymysql.connect(user="root",
                                       port=3306,
                                       host="127.0.0.1",
                                       database="GameEcharts",
                                       password='cyh0110')
        self.cur = self.connent.cursor()

    # 定义发送请求的函数
    def get_resp(self, url):
        resp = requests.get(url, headers=set_header(), timeout=3)
        # print(resp.text)
        html = etree.HTML(resp.text)
        return html

    # 提取分类URl
    def get_menu_whole(self, html):
        urls = html.xpath('//a[@class="m-title j_sidebar-m-title"]/@href')
        Toggle = html.xpath('//a[@class="m-title j_sidebar-m-title"]/span/text()')
        return urls, Toggle

    # 提取需要的信息
    def get_infomation(self, url, ToggleName):
        driver = self.driver
        driver.get(url)
        last_index = 10
        index = 1
        while last_index != index:
            sleep(2)
            html = etree.HTML(driver.page_source)
            liList = html.xpath("//li[@class='game-live-item']")
            for li in liList:
                GameTitle = re.sub("[.\'\"]", "", str(li.xpath("./a[@class='title']/@title")[0]))
                GameName = re.sub("[.\'\"]", "", str(li.xpath("./span/span[2]/a/@title")[0]))
                GameMan = re.sub("[.\'\"]", "", str(li.xpath("./span/span[1]/i/text()")[0]))
                GameHot = li.xpath(".//i[@class='js-num']/text()")
                if re.search("万", GameHot[0]):
                    GameHot = float(''.join(re.findall("[\d.]", GameHot[0])))*10000
                else:
                    GameHot = float(GameHot[0])
                print(ToggleName, GameTitle, GameName, GameMan, GameHot)
                sql = f"INSERT INTO game_info (ToggleName, GameName, GameHot, GameMan, GameTitle) values ('{ToggleName}', '{GameName}', '{int(GameHot)}', '{GameMan}', '{GameTitle}')"
                self.cur.execute(sql)
                self.connent.commit()
            driver.execute_script('document.querySelector(".laypage_next").click();')
            sleep(2)
            index += 1
            last_index = driver.find_element_by_css_selector('.laypage_last').text
            print(index, last_index)

    # 程序执行过程
    def run(self):
        html = self.get_resp(self.GameUrl)
        UrlList, ToggleName = self.get_menu_whole(html)
        for url in UrlList:
            self.get_infomation(url, ToggleName[UrlList.index(url)])


# 实例化类
# huya = HuyaSpider()
# 执行HuyaSpider类的run方法
# huya.run()


class IreseSpider():
    def __init__(self):
        self.url = "https://index.iresearch.com.cn/pcNew/GetDataList/?classId=16&classLevel=1&timeId="
        self.TidUrl = 'https://index.iresearch.com.cn/Content/Json/pcMonthSpans.json?t=1633412521399'
        self.connent = pymysql.connect(user="root",
                                       port=3306,
                                       host="127.0.0.1",
                                       database="GameEcharts",
                                       password='cyh0110')
        self.cur = self.connent.cursor()

    def get_resp(self, url):
        # 发送请求
        response = requests.get(url, headers=set_header())
        return response.content.decode('utf-8')

    def get_Tid(self, response):
        jsonStr = json.loads(response)
        Tid = {}
        for info in jsonStr:
            Tid[info['TimeName']] = info['ID']
        return Tid

    # 获取视频服务2020年9月-2021年8月排名
    def get_infomation(self, TimeName, response):
        jsonStr = json.loads(response)
        List = jsonStr["List"]
        for info in List:
            # 获取网站名
            WebName = info["AppName"]
            # 获取网站类型
            className = info["KclassName"]
            # 获取点击次数
            UserNum = info["UseNum"]
            # 获取环比增幅
            Growth = info["Growth"]
            print(TimeName, WebName, className, int(UserNum), Growth)
            sql = f"""INSERT INTO web_movie_info(TimeName, WebName, className, UserNum, Growth) 
                    values ('{TimeName}', '{WebName}', '{className}', {UserNum}, '{Growth}')"""
            self.cur.execute(sql)
            self.connent.commit()

    # 获取Web服务月覆盖人数前1000名排行
    def get_WebInfo(self):
        url = 'https://index.iresearch.com.cn/pcNew/GetDataList/?classId=0&classLevel=0&timeId=103&orderBy=2&pageIndex=1&pageSize=1000'
        jsonStr = json.loads(self.get_resp(url))
        List = jsonStr["List"]
        for info in List:
            WebName = info["AppName"]
            className = info["FclassName"]
            UserNum = info["UseNum"]
            Growth = info["Growth"]
            print(WebName, className, UserNum, Growth)
            sql = f"""INSERT INTO web_info(WebName, className, UserNum, Growth) 
                                values ('{WebName}', '{className}', {UserNum}, '{Growth}')"""
            self.cur.execute(sql)
            self.connent.commit()

    def run(self):
        response = self.get_resp(self.TidUrl)
        Tid = self.get_Tid(response)
        for TimeName, tid in Tid.items():
            url = self.url + str(tid)
            resp = self.get_resp(url)
            self.get_infomation(TimeName, resp)


huya = IreseSpider()
cur = huya.cur
con = huya.connent
huya.run()


# 获取斗鱼主播收入信息
def get_douyuBojiang():
    for i in range(1, 101):
        url = "https://www.bojianger.com/data/api/common/anchor_list.do?date=2021-10-06&categoryName=total&categoryId=0&clubName=total&clubNo=total&orderBy=audience_count&getType=all&pageNum={}&pageSize=30".format(i)
        resp = requests.get(url)
        # 将返回的json数据格式化
        jsonStr = json.loads(resp.text)
        rows = jsonStr['data']['rows']
        for row in rows:
            # 获取时间信息
            Time = row["date"]
            # 获取主播名
            name = row['name']
            # 获取游戏名
            GameName = row["cate_name"]
            # 获取活跃观众
            audience_count = row['audience_count']
            # 获取弹幕数量
            danmu_count = row['danmu_count']
            # 获取弹幕人数
            danmu_person_count = row['danmu_person_count']
            # 获取礼物总值
            yc_gift_value = row['yc_gift_value']
            # 获取峰值热度
            hn_max = row['hn_max']
            # 获取礼物人数
            gift_person_count = row['gift_person_count']
            print(Time, name, GameName, audience_count, danmu_count, danmu_person_count, yc_gift_value, hn_max, gift_person_count)
            sql = """INSERT INTO bojiang_info(
            name, Time, GameName, audience_count, danmu_count, danmu_person_count, yc_gift_value, hn_max, gift_person_count)
            VALUES ('{}', '{}', '{}', {}, {}, {}, '{}', {}, {})""".format(name, Time, GameName, audience_count, danmu_count, danmu_person_count, yc_gift_value, hn_max, gift_person_count)
            cur.execute(sql)
            con.commit()

# 获取虎牙主播收入信息
def get_huyabojiang():
    for i in range(1, 101):
        url = 'https://bojianger.com/huya/data/api/common/anchor_list.do?date=2021-10-06&keyword=&categoryName=total&categoryId=0&clubName=total&clubNo=total&orderBy=audience_count&getType=all&pageNum={}&pageSize=30'.format(i)
        resp = requests.get(url)
        jsonStr = json.loads(resp.text)
        rows = jsonStr['data']['rows']
        for row in rows:
            Time = row["date"]
            name = row['name']
            GameName = row["cate_name"]
            audience_count = row['audience_count']
            danmu_count = row['danmu_count']
            danmu_person_count = row['danmu_person_count']
            yc_gift_value = row['gift_value_total']
            hn_max = row['hn_max']
            gift_person_count = row['gift_person_count']
            sql = """INSERT INTO bojiang_info(
                        name, Time, GameName, audience_count, danmu_count, danmu_person_count, yc_gift_value, hn_max, gift_person_count)
                        VALUES ('{}', '{}', '{}', {}, {}, {}, '{}', {}, {})""".format(name, Time, GameName,
                                                                                      audience_count, danmu_count,
                                                                                      danmu_person_count, yc_gift_value,
                                                                 hn_max, gift_person_count)
            cur.execute(sql)
            con.commit()
get_huyabojiang()