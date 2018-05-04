# importing the requests library
import requests
import json
import pandas
from time import sleep
 
# defining the api-endpoint 
API_ENDPOINT = "https://parkspot.mi.hdm-stuttgart.de/api/input"

def extractData():
   try:
       data_frame = pandas.read_csv("../data/mockData.csv")
       json_data = data_frame.to_json(orient="records")
       json_to_python = json.loads(json_data)
       print(json_to_python)
       return json_to_python;
   except ValueError:
       print("CSV File 'mockData.csv' has to be in directory ../data")

while True:

    # sending post request and saving response as response object
    r = requests.post(url = API_ENDPOINT, json = extractData())
    # extracting response text 
    response = r.json
    print("The response is:%s"%response)
    sleep(10)
