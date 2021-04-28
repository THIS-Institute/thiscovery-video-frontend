import os
import json
from datetime import datetime
from appointments.acuity import Acuity, AcuityAuth
from appointments.timeslots import Timeslots
from secrets import SecretsManager
from api import constants
from api.responses import ApiGatewayResponse, ApiGatewayErrorResponse

def parse_date(date):
        return datetime.strptime(date, '%Y-%m-%d')

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
        error = ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_MISSING_PARAM,
            message='date is a required parameter',
        )

        return error.response()

    try:
        date = parse_date(date)
    except ValueError:
        error = ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_INVALID_PARAM,
            message='data parameter could not be parsed from a valid date string',
        )

        return error.response()

    if datetime.today() >= date:
        error = ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_INVALID_PARAM,
            message='date parameter must be in the future',
        )

        return error.response()

    try:
        appointment_type_id = path_parameters['typeId']
    except KeyError:
        error = ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_MISSING_PARAM,
            message='typeId is a required parameter',
        )

        return error.response()

    acuity = get_acuity_client()
    timeslots = Timeslots(acuity_client=acuity)

    available_timeslots = timeslots.get_date(
        date=date,
        appointment_type_id=appointment_type_id,
    )

    return ApiGatewayResponse(data=available_timeslots).response()
