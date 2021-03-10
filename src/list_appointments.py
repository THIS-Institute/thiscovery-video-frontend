import json
import os
import requests
from datetime import datetime

def list_available_events():
    appointment_id = os.environ['ACUITY_APPOINTMENT_ID']
    date = datetime.now()
    response = list_appointment_dates(appointment_id=appointment_id, date=date)
    dates_response = response.json()
    appointment_slots = []
    calendar = []

    for date in dates_response:
        response = list_appointment_times(appointment_id=appointment_id, date=date['date'])
        times_response = response.json()
        timestamp = datetime.strptime(date['date'], '%Y-%m-%d')
        formatted_date = timestamp.strftime('%a %d %b');
        timeslots = []

        for times in times_response:
            slot = format_appointment_slot(times)
            timeslots.append(slot)

        calendar_data = {
            'title': formatted_date,
            'timeslots': timeslots,
        }

        calendar.append(calendar_data)

    data = {
        'appointments': {
            'title': 'Book a live interview',
            'content': 'Pick from the available dates and times',
            'slots': {
                'title': 'Suggest recommendation for good practice',
                'calendar': calendar,
            }
        }
    }

    return json.dumps(data)

def format_appointment_slot(appointment):
    time = datetime.strptime(appointment['time'], '%Y-%m-%dT%H:%M:%S%z')
    formatted_time = time.strftime('%H:%M');

    slot = {
        'time': formatted_time,
        'meridiem': 'pm' if time.hour >= 12 else 'am',
        'available': True if appointment['slotsAvailable'] > 0 else False,
    }

    return slot

def list_appointment_dates(appointment_id, date):
    """Return appointment dates list

    Returns dates for given month for appointment type (logic later for end of month crossover)
    https://acuityscheduling.com/api/v1/availability/dates?appointmentTypeID=20973054&date=2021-03
    """
    month = date.strftime('%Y-%m')
    params=[('appointmentTypeID', appointment_id), ('month', month)]

    return make_request('dates', params)

def list_appointment_times(appointment_id, date):
    """Return appointment times list

    Returns times for given day for appointment type
    https://acuityscheduling.com/api/v1/availability/times?appointmentTypeID=20973054&date=2021-03-01
    """
    params=[('appointmentTypeID', appointment_id), ('date', date)]

    return make_request('times', params)

def make_request(endpoint, params):
    url = 'https://acuityscheduling.com/api/v1/availability/'

    return requests.get(url + endpoint, params=params, auth=(os.environ['ACUITY_UID'], os.environ['ACUITY_API_KEY']))

def lambda_handler(event, context):
    return list_available_events()
