import os
import json
import concurrent.futures
from datetime import datetime, timedelta
from appointments.acuity import Acuity

def get_next_date(date):
    return date + timedelta(days=1)

def fetch_initial_timeslots(days, start_date):
    next_date = start_date + timedelta(days=1)
    check_dates = []

    for i in range(days):
        check_dates.append(next_date)
        next_date = get_next_date(next_date)

    acuity = Acuity()
    dates = {}

    with concurrent.futures.ThreadPoolExecutor() as executor:
        date_futures = { executor.submit(fetch_date, acuity, date): date for date in check_dates }
        for future in concurrent.futures.as_completed(date_futures):
            date = date_futures[future]
            response = format_date_response(date=date, timeslots_result=future.result())
            dates[date.strftime('%Y%m%d')] = response

    sorted_dates = sort_dictionary_by_date(dates)
    timeslots = list(sorted_dates.values())

    return timeslots

def sort_dictionary_by_date(dates_dict):
    sorted_keys = sorted(dates_dict.keys())
    sorted_dictionary = {}
    
    for key in sorted_keys:
        sorted_dictionary[key] = dates_dict[key]

    return sorted_dictionary

def format_date_response(date, timeslots_result):
    timeslots = []

    available_timeslots = set()

    for timeslot in timeslots_result:
        time = parse_time(timeslot['time'])
        available_timeslots.add(time.strftime('%H%M'))

    current_time = date.replace(hour=9, minute=0, second=0, microsecond=0)
    day_end = date.replace(hour=17, minute=0, second=0, microsecond=0)

    while current_time <= day_end:
        timeslot = {
            'time': current_time.isoformat(),
            'available': current_time.strftime('%H%M') in available_timeslots,
        }

        timeslots.append(timeslot)
        current_time += timedelta(minutes=15)

    return {
        'date': date.strftime('%Y-%m-%d'),
        'limit': False,
        'timeslots': timeslots,
    }

def format_timeslot_response(timeslot_result):
    time = parse_time(timeslot_result['time'])

    return {
        'time': time.isoformat(),
        'available': timeslot_result['slotsAvailable'] > 0,
    }

def parse_time(response_time):
    return datetime.strptime(response_time, '%Y-%m-%dT%H:%M:%S%z')

def fetch_date(acuity, date):
    response = acuity.get_availability_times(
        appointment_type_id=os.environ['ACUITY_APPOINTMENT_TYPE_ID'],
        date=date.strftime('%Y-%m-%d')
    )

    return response

def lambda_handler(event, context):
    today = datetime.today()
    timeslots = fetch_initial_timeslots(days=5, start_date=today)

    if timeslots[0]:
        timeslots[0]['limit'] = True

    response = {
        'dates': timeslots,
    }

    return {
        'statusCode': 200,
        'body': json.dumps(timeslots)
    }
