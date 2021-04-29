import json
from datetime import datetime

from appointments.utils import AcuityClientFactory
from appointments.bookings import Bookings
from appointments.exceptions import BookingError

from api import constants
from api.responses import ApiGatewayResponse, ApiGatewayErrorResponse

def lambda_handler(event, context):
    request = json.loads(event['body'])

    try:
        appointment_id = request['appointmentId']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_MISSING_PARAM,
            message='appointmentId is required',
        ).response()

    appointment_time = datetime.strptime(request['time'], '%Y-%m-%d')

    acuity = AcuityClientFactory.create_client()
    bookings = Bookings(acuity_client=acuity)

    try:
        appointment = bookings.reschedule(
            appointment_id=appointment_id,
            appointment_time=appointment_time,
        )

    except BookingError:
        return ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_MISSING_PARAM,
            message='Could not cancel appointment',
        ).response()
    
    except:
        raise

    return ApiGatewayResponse(data=appointment).response()
