import os
import json, sys
from datetime import datetime
from appointments.acuity import Acuity, AcuityAuth
from appointments.timeslots import Timeslots
from secrets import SecretsManager

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

def get_acuity_client():
    secret = SecretsManager(os.environ['SECRETS_NAMESPACE'])

    auth = AcuityAuth(
        uid=secret.get('acuity-uid'),
        api_key=secret.get('acuity-api-key')
    )

    acuity_client = Acuity(auth=auth)

    return acuity_client

def lambda_handler(event, context):
    path_parameters = event['pathParameters']

    try:
        date = path_parameters['date']
    except KeyError:
        return build_error_response('Missing date parameter')

    try:
        date = parse_date(date)
    except ValueError:
        return build_error_response('Invalid date parameter')

    if datetime.today() >= date:
        return build_error_response('Date parameter must be in the future')

    acuity = get_acuity_client()
    timeslots = Timeslots(acuity_client=acuity)
    
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
