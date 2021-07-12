import os
import json
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
    def get_appointment(self, appointment_id):
        return self.get(endpoint=f'appointments/{appointment_id}')

    @decodes_response
    def create_appointment(self, appointment_time,
        appointment_type_id, email, first_name, last_name,
        anon_user_task_id, anon_project_specific_user_id):

        user_metadata = UserMetadata(
            anon_user_task_id,
            anon_project_specific_user_id,
        )

        fields = user_metadata.acuity_fields()

        data = {
            'datetime': appointment_time,
            'appointmentTypeID': appointment_type_id,
            'firstName': first_name,
            'lastName': last_name,
            'email': email,
            'fields': fields,
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

class AcuityError(Exception):
    """Generic Acuity error response."""

    def __init__(self, response):
        self.message = self.get_message(response)
    
    def get_message(self, response):
        try:
            response_info = response.json()
        except json.JSONDecodeError:
            response_info = response.text

        if isinstance(response_info, dict):
            return response_info['error']

        return response_info

class UserMetadata():
    FORM_AUT_ID = 8861964
    FORM_APSU_ID = 8941105

    def __init__ (self, anon_user_task_id, anon_project_specific_user_id):
        self.anon_user_task_id = anon_user_task_id
        self.anon_project_specific_user_id = anon_project_specific_user_id

    def acuity_fields(self):
        anon_user_task_id = self.meta_key_value(
            id=self.FORM_AUT_ID,
            value=self.anon_user_task_id
        )

        anon_project_specific_user_id = self.meta_key_value(
            id=self.FORM_APSU_ID,
            value=self.anon_project_specific_user_id
        )

        return [
            anon_user_task_id,
            anon_project_specific_user_id,
        ]

    def meta_key_value(self, id, value):
        return {
            'id': id,
            'value': value,
        }
