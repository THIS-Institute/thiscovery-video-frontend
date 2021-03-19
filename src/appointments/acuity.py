import os
from requests import Request, Session
from requests.auth import HTTPBasicAuth

class Acuity:
    def __init__(self):
        self._base_uri = os.environ['ACUITY_BASE_URI']
        self._auth = HTTPBasicAuth(os.environ['ACUITY_UID'], os.environ['ACUITY_API_KEY'])

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
            'date': date
        }

        response = self._send_request(endpoint='availability/times', params=params)

        if response.ok:
            return response.json()
        
        return response

    def _send_request(self, endpoint, method='GET', data=None, params=None):
        session = Session()
        request = Request(
            method=method,
            url=self._base_uri + endpoint,
            json=data,
            params=params,
            auth=self._auth
        )

        prepared_request = session.prepare_request(request)
        response = session.send(prepared_request)

        return response
