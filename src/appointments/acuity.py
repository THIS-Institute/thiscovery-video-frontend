import os
from api.decorators import decodes_response
from requests import Session
from requests.auth import HTTPBasicAuth

class Acuity:
    def __init__(self, auth, base_uri=None):
        self._base_uri = base_uri or os.environ['ACUITY_BASE_URI']
        self._session = Session()
        self._session.auth = auth

    @decodes_response
    def get_availability_dates(self, appointment_type_id, month):
        params = {
            'appointmentTypeID': appointment_type_id,
            'month': month
        }

        return self.get(endpoint='availability/dates', params=params)

    @decodes_response
    def get_availability_times(self, appointment_type_id, date):
        params = {
            'appointmentTypeID': appointment_type_id,
            'date': date,
            'timezone': 'Europe/London',
        }

        return self.get(endpoint='availability/times', params=params)

    @decodes_response
    def check_availability(self, appointment_type_id, appointment_time):
        data = {
            'datetime': appointment_time,
            'appointmentTypeID': appointment_type_id,
        }

        return self.post(endpoint='availability/check-times', json=data)

    @decodes_response
    def create_appointment(self, appointment_time,
        appointment_type_id, email, first_name, last_name):
        data = {
            'datetime': appointment_time,
            'appointmentTypeID': appointment_type_id,
            'firstName': first_name,
            'lastName': last_name,
            'email': email,
        }

        return self.post(endpoint='appointments', json=data)

    @decodes_response
    def reschedule_appointment(self, appointment_id, appointment_time):
        data = {
            'datetime': appointment_time,
            'calendarID': None,
        }

        return self.put(
            endpoint=f'appointments/{ str(appointment_id) }/reschedule',
            json=data,
        )

    @decodes_response
    def cancel_appointment(self, appointment_id):
        return self.put(endpoint=f'appointments/{ str(appointment_id) }/cancel')

    def get(self, endpoint, **kwargs):
        return self._request('GET', endpoint, **kwargs)

    def post(self, endpoint, **kwargs):
        return self._request('POST', endpoint, **kwargs)
    
    def put(self, endpoint, **kwargs):
        return self._request('PUT', endpoint, **kwargs)
    
    def _request(self, method, endpoint, **kwargs):
        url = self._base_uri + endpoint

        return self._session.request(method, url, **kwargs)

class AcuityAuth(HTTPBasicAuth):
    def __init__(self, uid, api_key):
        super().__init__(uid, api_key)
