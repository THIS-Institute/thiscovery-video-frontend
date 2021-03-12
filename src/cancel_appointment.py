import json
import os
import requests

def cancel_appointment(appointment_id):
    response = make_request(endpoint='appointments/' + str(appointment_id) + '/cancel')
    if response.status_code == 200:
        print('Booking cancelled for appointment id: ' + str(appointment_id))
    else:
        print('Booking could not be cancelled: ' + response.json()['message'])

    return

def make_request(endpoint):
    url = 'https://acuityscheduling.com/api/v1/'

    return requests.put(url + endpoint, auth=(os.environ['ACUITY_UID'], os.environ['ACUITY_API_KEY']))

def lambda_handler(event, context):
    appointment_id = 544549674

    return cancel_appointment(appointment_id=appointment_id)
