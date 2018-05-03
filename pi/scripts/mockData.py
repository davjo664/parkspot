# importing the requests library
import requests
import json
import pandas
from time import sleep

# defining the api-endpoint
API_ENDPOINT = "https://parkspot.mi.hdm-stuttgart.de/api/input"

def extract_data():
    try:
        data_frame = pandas.read_csv("parkspots.csv")
    finally:
        jsonData = data_frame.to_json(orient="records")
        jsonToPython = json.loads(jsonData)
        print(jsonToPython)
        return jsonToPython;

while True:

    # sending post request and saving response as response object
    r = requests.post(url = API_ENDPOINT, json = extract_data())
    # extracting response text
    response = r.json
    print("The response is:%s"%response)
    sleep(10)