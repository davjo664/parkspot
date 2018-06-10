"""
Author: Humphrey Shotton
Filename: senddata.py
Version: 1.0 (2014-01-17)

Description:
Pi Car Park sensor server communication module.

Used to send update data about changed in the car parking spaces
to a central server.

"""
import requests
import json
import data.settings as s

def post_request(vals, url):
    """
    Build a post request.

    Args:
        vals: Dictionary of (field, values) for the POST
            request.
        url: URL to send the data to.

    Returns:
        Dictionary of JSON response or error info.
    """
    # send request to server    
    try:
        request = requests.post(url = url, json = vals)
        response = request.json
        return {"success": format(response)}
    except:
        return {"error": "Could not send data to server."}

def send_update(area_id, status_code):
    """
    Sends the data of parking space status to the server
    using a HTTP POST request.

    Args:
        area_id: Car park space area id.
        status_code: Status of the car park.

    Returns:
        Dictionary of elements from the JSON response.
    """
    json_data = '[{"parkSpotId":'+format(area_id)+',"available":'+format(status_code)+'}]'
    python_json_data = json.loads(json_data)
    
    return post_request(python_json_data, s.SERVER_URL)

if __name__ == "__main__":
    # Example for sending updates
    for i in range(0,5):
        j = send_update(i, 1)
        print j
