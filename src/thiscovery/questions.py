from .client import ThiscoveryClient

class QuestionsService(ThiscoveryClient):
    def get(self, task_id):
        endpoint = f'interview-questions/{task_id}'

        response = self.client.request(
            method='GET',
            endpoint=endpoint,
        )

        if not response.ok:
            if response.status_code == 404:
                raise QuestionsNotFound(response)
            else:
                response.raise_for_status()

        return response.json()

class QuestionsNotFound(Exception):
    """Questions were not found."""

    def __init__(self, response):
        self.response = response
