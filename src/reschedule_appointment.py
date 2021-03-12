import json
import os
import requests
from datetime import datetime, timedelta

def reschedule_appointment(appointment_id, appointment_data):
    response = make_request(endpoint='appointments/' + str(appointment_id) + '/reschedule', data=appointment_data)
    if response.status_code == 200:
        print('Booking for appointment id: ' + str(appointment_id) + ' rescheduled to: ' + appointment_data['datetime'])
    else:
        print('Booking could not be rescheduled: ' + response.json()['message'])

    return

def make_request(endpoint, data):
    url = 'https://acuityscheduling.com/api/v1/'

    return requests.put(url + endpoint, data=json.dumps(data), auth=(os.environ['ACUITY_UID'], os.environ['ACUITY_API_KEY']))

def lambda_handler(event, context):
    appointment_id = 544674332
    tomorrow = datetime.now() + timedelta(days=2)
    appointment_time = tomorrow.strftime('%Y-%m-%dT15:00:00%z')
    appointment_data = {
        'datetime': appointment_time,
    }

    return reschedule_appointment(appointment_id=appointment_id, appointment_data=appointment_data)
