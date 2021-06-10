from .client import ThiscoveryClient

class UserResponseService(ThiscoveryClient):
    def get(self, response_id):
        response = self.client.request(
            method='GET',
            endpoint=f'user-interview-tasks/{response_id}',
        )

        if not response.ok:
            if response.status_code == 404:
                raise ResponseNotFound(response)
            else:
                response.raise_for_status()

        return response.json()

class ResponseNotFound(Exception):
    """User response was not found."""

    def __init__(self, response):
        self.response = response
