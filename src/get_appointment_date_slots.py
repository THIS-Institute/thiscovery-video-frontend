import os
import json, sys
from datetime import datetime
from appointments.acuity import Acuity
from appointments.timeslots import Timeslots

def parse_date(date):
        return datetime.strptime(date, '%Y-%m-%d')

def build_error_response(message):
    response = {
        'error': True,
        'message': message,
    }

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 422,
        'body': json.dumps(response)
    }

def lambda_handler(event, context):
    path_parameters = event['pathParameters']

    if 'date' not in path_parameters:
        return build_error_response('Missing date parameter')

    date = path_parameters['date']

    try:
        date = parse_date(date)
    except ValueError:
        return build_error_response('Invalid date parameter')

    if datetime.today() >= date:
        return build_error_response('Date parameter must be in the future')

    acuity = Acuity()
    timeslots = Timeslots(acuity=acuity)
    
    appointment_type_id = os.environ['ACUITY_APPOINTMENT_TYPE_ID']

    available_timeslots = timeslots.get_date(
        date=date,
        appointment_type_id=appointment_type_id,
    )

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps(available_timeslots)
    }
