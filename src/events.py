import os
import json
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
    DEFAULT_EVENT_BUS_NAME = 'thiscovery-event-bus'

    def __init__(self, event_bus=None, time=None, source=None, resources=None, detail_type=None, detail=None):
        self.event_bus = event_bus
        self.time = time
        self.source = source
        self.resources = resources
        self.detail_type = detail_type
        self.detail = detail

    def get_dict(self):
        dict = {}

        if self.event_bus:
            dict['EventBusName'] = self.event_bus
        else:
            dict['EventBusName'] = self.DEFAULT_EVENT_BUS_NAME

        if self.time:
            dict['Time'] = self.time

        if self.source:
            dict['Source'] = self.source

        if self.resources:
            dict['Resources'] = self.resources

        if self.detail_type:
            dict['DetailType'] = self.detail_type

        if self.detail:
            dict['Detail'] = json.dumps(self.detail)

        return dict

