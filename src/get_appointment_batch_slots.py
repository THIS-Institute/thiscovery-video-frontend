import os
import json
from datetime import datetime
from appointments.acuity import Acuity, AcuityAuth
from appointments.timeslots import Timeslots
from secrets import SecretsManager

def get_acuity_client():
    secret = SecretsManager(os.environ['SECRETS_NAMESPACE'])

    auth = AcuityAuth(
        uid=secret.get('acuity-uid'),
        api_key=secret.get('acuity-api-key')
    )

    acuity_client = Acuity(auth=auth)

    return acuity_client

def lambda_handler(event, context):
    acuity = get_acuity_client()
    timeslots = Timeslots(acuity_client=acuity)

    date_offset = datetime.today()
    days = int(os.environ['APPOINTMENT_DEFAULT_DAYS'])
    appointment_type_id = os.environ['ACUITY_APPOINTMENT_TYPE_ID']

    available_timeslots = timeslots.get_batch_dates(
        days=days,
        date_offset=date_offset,
        appointment_type_id=appointment_type_id,
    )

    response = {
        'dates': available_timeslots,
    }

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps(response)
    }
