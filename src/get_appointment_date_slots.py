import os
import json
from datetime import datetime

from appointments.utils import AcuityClientFactory
from appointments.timeslots import Timeslots

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    path_parameters = event['pathParameters']

    try:
        date = datetime.strptime(path_parameters['date'], '%Y-%m-%d')
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='date is a required parameter',
        ).response()
    except ValueError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_INVALID_TIME,
            message='data parameter could not be parsed from a valid date string',
        ).response()

    if datetime.today() >= date:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_INVALID_PARAM,
            message='date parameter must be in the future',
        ).response()

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

    available_timeslots = timeslots.get_date(
        date=date,
        appointment_type_id=appointment_type_id,
    )

    return ApiGatewayResponse(data=available_timeslots).response()
