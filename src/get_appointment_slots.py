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

    dates = {}

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        date_futures = {executor.submit(fetch_date, acuity, date): date for date in check_dates}
        for future in concurrent.futures.as_completed(date_futures):
            date = date_futures[future]
            response = future.result()
            dates[date.strftime('%Y-%m-%d')] = response

    return dates

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
