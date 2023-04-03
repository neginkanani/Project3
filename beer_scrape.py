from splinter import Browser
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time
import requests
import pprint
from itertools import chain



def read_untapped(b):
    '''Read the scraped data from the untapped website which is tored in MongoDB and is exported
    to brewery_untapped_export_MD.json to collect the latest beer information'''
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)
    #reading the html code
    html = browser.html
    soup = BeautifulSoup(html, "lxml")
    url_untapped = f'https://untappd.com/brewery/top_rated?brewery_type={b}'
    browser.visit(url_untapped)
    time.sleep(1)
    breweries = browser.find_by_xpath('//*[@id="slide"]/div[2]/div/div[1]/div/div[4]')
    
    all_brewery_info = []
    for brewery in breweries:
        title_link = brewery.text
        all_brewery_info.append(title_link)
        time.sleep(2)


    brewery_list = all_brewery_info[0].split("\n")
    
    
    for item in all_brewery_info:
        if item == "Report":
            all_brewery_info.remove("Report Ad")
    
    brewery_list_all = []
    i = 0
    while i < len(brewery_list):
        if i == "Report Ad":
            brewery_list.remove("Report Ad")
        else:
         try:
            brewery = brewery_list[i:i+5]
            #print(brewery)
            dictionary = dict()
            dictionary['brewery_name'] = brewery[0]
            dictionary['brewery_location'] = brewery[1]
            dictionary['brewery_type'] = brewery[2]
            dictionary['number_beers'] = brewery[3]
            dictionary['brewery_ratings'] = brewery[4]
         except IndexError:
            print(f"This batch broke: {brewery}")
            break
        brewery_list_all.append(dictionary)
        i += 5
    browser.quit()
    return brewery_list_all