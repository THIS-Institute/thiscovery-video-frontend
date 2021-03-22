import os
import json
import concurrent.futures
from datetime import datetime, timedelta
from appointments.acuity import Acuity

def get_next_date(date):
    return date + timedelta(days=1)

def fetch_initial_timeslots(days, start_date):
    start_date = datetime.today()
    next_date = start_date + timedelta(days=1)
    check_dates = []

    for i in range(days+1):
        check_dates.append(next_date)
        next_date = get_next_date(next_date)

    acuity = Acuity()
    dates = dict()

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        date_futures = { executor.submit(fetch_date, acuity, date): date for date in check_dates }
        for future in concurrent.futures.as_completed(date_futures):
            date = date_futures[future]
            response = format_date_response(date=date, timeslots_result=future.result())
            dates[date.strftime('%Y%m%d')] = response

    sorted_keys = sorted(dates.keys())
    sorted_dates = dict()
    
    for key in sorted_keys:
        sorted_dates[key] = dates[key]

    return sorted_dates

def format_date_response(date, timeslots_result):
    timeslots = []

    for timeslot_result in timeslots_result:
        timeslots.append(format_slot_response(timeslot_result=timeslot_result))

    return {
        'date': date.strftime('%Y-%m-%d'),
        'timeslots': timeslots,
    }

def format_slot_response(timeslot_result):
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
    dates = fetch_initial_timeslots(days=5, start_date=today)

    return {
        'statusCode': 200,
        'body': json.dumps(dates)
    }