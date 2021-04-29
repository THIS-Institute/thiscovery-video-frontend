from .exceptions import BookingError, InvalidTimeslot

class Bookings:
    def __init__(self, acuity_client):
        self.acuity = acuity_client

    def create(self, appointment_type_id, appointment_time, user):
        availability = self.acuity.check_availability(
            appointment_type_id=appointment_type_id,
            appointment_time=appointment_time,
        )
    
        if not availability['valid']:
            raise InvalidTimeslot

        appointment = self.acuity.create_appointment(
            appointment_time=appointment_time,
            appointment_type_id=appointment_type_id,
            email=user['email'],
            first_name=user['firstName'],
            last_name=user['lastName'],
        )

        if 'id' not in appointment:
            raise BookingError

        return appointment

    def reschedule(self, appointment_id, appointment_type_id, appointment_time):
        availability = self.acuity.check_availability(
            appointment_type_id=appointment_type_id,
            appointment_time=appointment_time,
        )
    
        if not availability['valid']:
            raise InvalidTimeslot
        
        appointment = self.acuity.reschedule_appointment(
            appointment_id=appointment_id,
            appointment_time=appointment_time,
        )

        if 'id' not in appointment:
            raise BookingError

        return appointment

    def cancel(self, appointment_id):
        return self.acuity.cancel_appointment(
            appointment_id=appointment_id,
        )
