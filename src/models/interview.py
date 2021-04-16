import os
import logging
import boto3

log = logging.getLogger(__name__)

class Interview:
    def __init__(self):
        kwargs = {'service_name': 'dynamodb'}

        if 'LOCAL_AWS_ENDPOINT' in os.environ:
            kwargs['endpoint_url'] = os.environ['LOCAL_AWS_ENDPOINT']

        self.dynamodb = boto3.resource(**kwargs)
        self.table_name = 'Interviews'

    def create(self, user_id, interview_id):
        print('Create')

    def find(self, user_id, interview_id):
        print('Find')

    def update(self, user_id, interview_id, **kwargs):
        print('Update')
