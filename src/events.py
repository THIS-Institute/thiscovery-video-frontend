import os
import boto3

class EventBridge:
    def __init__(self, namespace):
        self.namespace = namespace

        kwargs = {'service_name': 'events'}

        if 'LOCAL_AWS_ENDPOINT' in os.environ:
            kwargs['endpoint_url'] = os.environ['LOCAL_AWS_ENDPOINT']

        self.client = boto3.client(**kwargs)

    def put_event(self, event):
        return self.client.put_events(
            Entries=[
                event.get_dict(),
            ]
        )

class Event:
    def __init__(self, time=None, source=None, resources=None, detail_type=None, detail=None):
        self.time = time
        self.source = source
        self.resources = resources
        self.detail_type = detail_type
        self.detail = detail

    def get_dict(self):
        dict = {}

        if self.time:
            dict['Time'] = self.time

        if self.source:
            dict['Source'] = self.source

        if self.resources:
            dict['Resources'] = self.resources

        if self.detail_type:
            dict['DetailType'] = self.detail_type

        if self.detail:
            dict['Detail'] = self.detail

        return dict

