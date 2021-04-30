import json
from datetime import datetime

from appointments.utils import AcuityClientFactory
from appointments.bookings import Bookings
from appointments.exceptions import (
    InvalidTimeslot,
    BookingError,
    AppointmentNotFound,
)

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    request = json.loads(event['body'])

    try:
        appointment_id = event['pathParameters']['id']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='appointment id not found',
        ).response()
    
    try:
        appointment_type_id = request['appointmentTypeId']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='appointmentTypeId is required',
        ).response()

    try:
        appointment_time = datetime.strptime(request['time'], '%Y-%m-%dT%H:%M:%S%z')
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='time is required',
        ).response()
    except ValueError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_INVALID_TIME,
            message='There was an error when trying to parse the time string',
        ).response()

    acuity = AcuityClientFactory.create_client()
    bookings = Bookings(acuity_client=acuity)

    try:
        appointment = bookings.reschedule(
            appointment_id=appointment_id,
            appointment_time=appointment_time,
            appointment_type_id=appointment_type_id,
        )
    except InvalidTimeslot:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_INVALID_TIMESLOT,
            message='Timeslot is not valid',
        ).response()
    except AppointmentNotFound:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_APPOINTMENT_NOT_FOUND,
            message='Appointmet ID was not found in Acuity',
        ).response()
    except BookingError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='Could not reschedule appointment',
        ).response()
    except:
        raise

    return ApiGatewayResponse(data=appointment).response()
