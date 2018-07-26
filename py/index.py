# -*- coding : UTF-8 -*-
from bs4 import BeautifulSoup
import urllib2


def spider():
    html = urllib2.urlopen('https://preview.pro.ant.design/#')
    html = html.read()
    soup = BeautifulSoup(html, 'lxml')
    print(soup.prettify())


if __name__ == '__main__':
    spider()
