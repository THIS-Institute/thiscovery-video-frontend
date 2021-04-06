import os
import json
from datetime import datetime
from appointments.acuity import Acuity
from appointments.timeslots import Timeslots

def lambda_handler(event, context):
    acuity = Acuity()
    timeslots = Timeslots(acuity=acuity)

    now = datetime.today()
    days = int(os.environ['APPOINTMENT_DEFAULT_DAYS'])
    appointment_type_id = os.environ['ACUITY_APPOINTMENT_TYPE_ID']

    available_timeslots = timeslots.get_batch_dates(
        days=days,
        start_date=now,
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
