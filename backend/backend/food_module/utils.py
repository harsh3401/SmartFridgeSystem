from ast import List, Dict
import requests
import json
from bs4 import BeautifulSoup
import urllib.request
import os


DL_SERVER_BASE_URL = "http://localhost:5000/"
headers = {"Content-type": "application/json"}


def get_recommendation(food_items: List) -> Dict:
    # get the recommendations from the DL server and return it
    data = {"ingredients": food_items}
    # print(data)
    response = requests.post(
        DL_SERVER_BASE_URL + "api/ml/recommend", data=json.dumps(data), headers=headers
    )

    # print(response.status_code)
    return response.json()


def get_recipe_image_url(recipe_name:str):
    # url = "https://www.google.com/search?q=" + recipe_name + "&source=lnms&tbm=isch"
    # headers = {'User-Agent': 'Mozilla/5.0'}
    # response = requests.get(url, headers=headers)

    # soup = BeautifulSoup(response.content, 'html.parser')
    # img_tags = soup.find_all('img')

    # img_url = img_tags[3]['src'] # Get the source URL of the first image
    # return img_url
    
    api_key = os.environ.get("YOUTUBE_API_KEY")
    url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + recipe_name + "&type=video&key=" + api_key
    response = requests.get(url)
    response_json = response.json()
    if response_json['items']:
        first_video_thumbnail = response_json['items'][0]['snippet']['thumbnails']['medium']['url']
        return first_video_thumbnail
    else:
        return None


def get_recipe_video_url(recipe_name:str):
    # url = "https://www.google.com/search?q=" + recipe_name + "&tbm=vid&tbo=u&source=univ&sa=X"
    # print(url)
    # headers = {'User-Agent': 'Mozilla/5.0'}
    # response = requests.get(url, headers=headers)

    # soup = BeautifulSoup(response.content, 'html.parser')
    # print(soup)
    # video_tags = soup.select('a[href^="/url?q="]')
    # print(video_tags)
    # if video_tags:
    #     first_video_link = video_tags[0]['href'][7:]
    #     return first_video_link    
    # else:
    #     return None

    api_key = os.environ.get("YOUTUBE_API_KEY")
    url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + recipe_name + "&type=video&key=" + api_key
    response = requests.get(url)
    response_json = response.json()
    if response_json['items']:
        first_video_link = "https://www.youtube.com/watch?v=" + response_json['items'][0]['id']['videoId']
        return first_video_link
    else:
        return None