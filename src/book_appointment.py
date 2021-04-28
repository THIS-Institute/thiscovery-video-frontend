import json
import requests
from datetime import datetime

from appointments.utils import AcuityClientFactory
from appointments.bookings import Bookings
from appointments.exceptions import BookingError, InvalidTimeslot

from api import constants
from api.responses import ApiGatewayResponse, ApiGatewayErrorResponse

def lambda_handler(event, context):
    request = json.loads(event['body'])

    appointment_type_id = request['appointmentTypeId']
    appointment_time = datetime.strptime(request['time'], '%Y-%m-%d')

    acuity = AcuityClientFactory.create_client()
    bookings = Bookings(acuity_client=acuity)

    try:
        appointment = bookings.create(
            appointment_type_id=appointment_type_id,
            appointment_time=appointment_time,
            user=request,
        )

    except InvalidTimeslot:
        return ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_INVALID_TIMESLOT,
            message='Timeslot is not valid',
        ).response()

    except BookingError:
        return ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_APPOINTMENT_FAILED,
            message='Appointment booking failed',
        ).response()

    except:
        raise

    return ApiGatewayResponse(
        data=appointment,
        http_code=201,
    ).response()
