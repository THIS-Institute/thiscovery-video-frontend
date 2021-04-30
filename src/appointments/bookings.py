from .exceptions import BookingError, InvalidTimeslot, AppointmentNotFound
from .acuity import AcuityError

from requests import Response

class Bookings:
    def __init__(self, acuity_client):
        self.acuity = acuity_client

    def create(self, appointment_type_id, appointment_time, user):
        time_string = appointment_time.strftime('%Y-%m-%dT%H:%M:%S%z')

        availability = self.acuity.check_availability(
            appointment_type_id=appointment_type_id,
            appointment_time=time_string,
        )
    
        if not availability['valid']:
            raise InvalidTimeslot

        appointment = self.acuity.create_appointment(
            appointment_time=time_string,
            appointment_type_id=appointment_type_id,
            email=user['email'],
            first_name=user['firstName'],
            last_name=user['lastName'],
        )

        if 'id' not in appointment:
            raise BookingError

        return appointment

    def reschedule(self, appointment_id, appointment_type_id, appointment_time):
        time_string = appointment_time.strftime('%Y-%m-%dT%H:%M:%S%z')

        availability = self.acuity.check_availability(
            appointment_type_id=appointment_type_id,
            appointment_time=time_string,
        )
    
        if not availability['valid']:
            raise InvalidTimeslot
        
        appointment = self.acuity.reschedule_appointment(
            appointment_id=appointment_id,
            appointment_time=time_string,
        )

        if isinstance(appointment, Response):
            if appointment.status_code == 404:
                raise AppointmentNotFound
            else:
                raise AcuityError(appointment)

        if 'id' not in appointment:
            raise BookingError

        return appointment

    def cancel(self, appointment_id):
        cancellation = self.acuity.cancel_appointment(
            appointment_id=appointment_id,
        )

        if isinstance(cancellation, Response):
            if cancellation.status_code == 404:
                raise AppointmentNotFound
            else:
                raise AcuityError(cancellation)

        return cancellation
