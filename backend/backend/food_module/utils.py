from ast import List, Dict
import requests
import json

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
    print(response.content)
    return response.json()
