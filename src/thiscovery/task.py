from .client import ThiscoveryClient

class TaskService(ThiscoveryClient):
    def get(self, task_id):
        endpoint = f'interview-tasks/{task_id}'

        response = self.client.request(
            method='GET',
            endpoint=endpoint,
        )

        if not response.ok:
            if response.status_code == 404:
                raise TaskNotFound(response)
            else:
                response.raise_for_status()

        return response.json()

class TaskNotFound(Exception):
    """Task was not found."""

    def __init__(self, response):
        self.response = response
