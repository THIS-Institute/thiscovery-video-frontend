import os
import boto3

class DynamoDB:
    def __init__(self):
        kwargs = {'service_name': 'dynamodb'}

        if 'LOCAL_AWS_ENDPOINT' in os.environ:
            kwargs['endpoint_url'] = os.environ['LOCAL_AWS_ENDPOINT']

        self.dynamodb = boto3.resource(**kwargs)
    
    def client(self):
        return self.dynamodb.Table('Interviews')
