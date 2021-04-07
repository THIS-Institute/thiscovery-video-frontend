import os
from requests import Request, Session
from requests.auth import HTTPBasicAuth

class Acuity:
    def __init__(self, auth):
        self._base_uri = os.environ['ACUITY_BASE_URI']
        self._auth = auth
        self._session = Session()

    def get_availability_dates(self, appointment_type_id, month):
        params = {
            'appointmentTypeID': appointment_type_id,
            'month': month
        }

        response = self._send_request(endpoint='availability/dates', params=params)

        if response.ok:
            return response.json()
        
        return response

    def get_availability_times(self, appointment_type_id, date):
        params = {
            'appointmentTypeID': appointment_type_id,
            'date': date,
            'timezone': 'Europe/London',
        }

        response = self._send_request(endpoint='availability/times', params=params)

        if response.ok:
            return response.json()
        
        return response

    def _send_request(self, endpoint, method='GET', data=None, params=None):
        response = self._session.request(
            method=method,
            url=self._base_uri + endpoint,
            json=data,
            params=params,
            auth=self._auth
        )

        return response

class AcuityAuth(HTTPBasicAuth):
    def __init__(self, uid, api_key):
        super().__init__(uid, api_key)
