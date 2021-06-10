import os
import requests
from requests.auth import AuthBase
from secrets import SecretsManager

class Client:
    VERSION = 'v1'

    def __init__(self, auth):
        self.base_url = os.environ['THISCOVERY_API_BASE_URL']
        self.auth = auth

    def request(self, method, endpoint, **kwargs):
        url = f'{self.base_url}{self.VERSION}/{endpoint}'

        return requests.request(method, url, auth=self.auth, timeout=3, **kwargs)

class ApiKeyAuth(AuthBase):
    def __init__(self, key):
        self.key = key

    def __call__(self, request):
        request.headers['x-api-key'] = self.key
        return request

class ThiscoveryClient:
    def __init__(self):
        self.auth = self.auth()
        self.client = self.client()

    def client(self):
        return Client(self.auth)

    def auth(self):
        api_key = self.fetch_secret('thiscovery-api-key')
        return ApiKeyAuth(key=api_key)

    def fetch_secret(self, secret):
        namespace = os.environ['SECRETS_NAMESPACE']
        secrets = SecretsManager(namespace)

        return secrets.get(secret)
