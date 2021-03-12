import json
import os
import requests
from datetime import datetime, timedelta

def book_appointment(appointment_type_id, appointment_time, appointment_data):
    availability = check_availability(appointment_type_id=appointment_type_id, appointment_time=appointment_time)

    if availability.json()['valid'] != True:
        booking_failed(appointment_time)
    else:
        response = make_request('appointments', data=appointment_data)
        appointment = response.json()
        print('Booking made, appointment id: ' + str(appointment['id']))

    return

def booking_failed(appointment_time):
    print('Unable to make a booking for requested time slot: ' + appointment_time)
    return

def check_availability(appointment_type_id, appointment_time):
    data = {
        'datetime': appointment_time,
        'appointmentTypeID': appointment_type_id,
    }

    return make_request('availability/check-times', data=data)

def make_request(endpoint, data):
    url = 'https://acuityscheduling.com/api/v1/'

    return requests.post(url + endpoint, data=json.dumps(data), auth=(os.environ['ACUITY_UID'], os.environ['ACUITY_API_KEY']))

def lambda_handler(event, context):
    appointment_type_id = os.environ['ACUITY_APPOINTMENT_TYPE_ID']
    tomorrow = datetime.now() + timedelta(days=2)
    appointment_time = tomorrow.strftime('%Y-%m-%dT09:00:00%z')
    appointment_data = {
        'datetime': appointment_time,
        'appointmentTypeID': appointment_type_id,
        'firstName': 'Test',
        'lastName': 'User',
        'email': 'test.user@engageinteractive.co.uk',
    }

    return book_appointment(appointment_type_id=appointment_type_id, appointment_time=appointment_time, appointment_data=appointment_data)
