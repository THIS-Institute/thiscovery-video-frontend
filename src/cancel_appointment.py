import json

from appointments.utils import AcuityClientFactory
from appointments.bookings import Bookings
from appointments.exceptions import (
    CancellationError,
    AppointmentNotFound,
)

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    try:
        appointment_id = event['pathParameters']['id']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='appointmentId is required',
        ).response()

    acuity = AcuityClientFactory.create_client()
    bookings = Bookings(acuity_client=acuity)

    try:
        bookings.cancel(
            appointment_id=appointment_id
        )
    except CancellationError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='Could not cancel appointment',
        ).response()
    except AppointmentNotFound:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_APPOINTMENT_NOT_FOUND,
            message='Appointmet ID was not found in Acuity',
        ).response()
    except:
        raise

    response = {
        'message': 'Appointment cancelled',
    }

    return ApiGatewayResponse(data=response).response()
