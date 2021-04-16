import os
import logging
import boto3
from botocore.exceptions import ClientError

log = logging.getLogger(__name__)

class SecretsManager:
    def __init__(self, namespace):
        self.namespace = namespace

        kwargs = {'service_name': 'secretsmanager'}

        if 'LOCAL_AWS_ENDPOINT' in os.environ:
            kwargs['endpoint_url'] = os.environ['LOCAL_AWS_ENDPOINT']

        self.client = boto3.client(**kwargs)

    def get(self, key):
        namespaced_key = self.build_namespaced_key(key)

        try:
            response = self.client.get_secret_value(
                SecretId=namespaced_key,
            )

        except self.client.exceptions.ResourceNotFoundException:
            log.exception('Secret %s was not found.', namespaced_key)
            raise

        except ClientError:
            log.exception('Could not get secret %s.', namespaced_key)
            raise

        return response['SecretString']

    def build_namespaced_key(self, key):
        return self.namespace + key
