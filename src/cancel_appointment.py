import json

from appointments.utils import AcuityClientFactory
from appointments.bookings import Bookings
from appointments.exceptions import CancellationError

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

    acuity = AcuityClientFactory.create_client()
    bookings = Bookings(acuity_client=acuity)

    try:
        bookings.cancel(
            appointment_id=appointment_id
        )

    except CancellationError:
        return ApiGatewayErrorResponse(
            exception=constants.EXCEPTION_MISSING_PARAM,
            message='Could not cancel appointment',
        ).response()
    
    except:
        raise

    response = {
        'message': 'Appointment cancelled',
    }

    return ApiGatewayResponse(data=response).response()
