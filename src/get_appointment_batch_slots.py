import os
import json
from datetime import datetime, timedelta

from appointments.utils import AcuityClientFactory
from appointments.timeslots import Timeslots

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    path_parameters = event['pathParameters']
    query_parameters = event['queryStringParameters']

    try:
        appointment_type_id = path_parameters['typeId']
    except KeyError:
        error = ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='typeId is a required parameter',
        )

        return error.response()

    acuity = AcuityClientFactory.create_client()
    timeslots = Timeslots(acuity_client=acuity)

    if query_parameters and 'offset' in query_parameters:
        date_offset = datetime.strptime(query_parameters['offset'], '%Y-%m-%d')
    else:
        date_offset = datetime.today() - timedelta(days=1)
    
    days = int(os.environ['APPOINTMENT_DEFAULT_DAYS'])

    available_timeslots = timeslots.get_batch_dates(
        days=days,
        date_offset=date_offset,
        appointment_type_id=appointment_type_id,
    )

    response = {
        'dates': available_timeslots,
    }

    return ApiGatewayResponse(data=response).response()
