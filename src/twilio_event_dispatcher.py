import json
from urllib.parse import parse_qs
from events import Event, EventBridge

def dispatch(status_callback, event_name):
    event_bridge = EventBridge()

    event = Event(
            source='thiscovery_video',
            detail_type=event_name,
            detail=status_callback,
        )

    event_bridge.put_event(event)

def normalise_dict(dict):
    normalised_dict = {}

    for key in dict:
        if len(dict[key]) > 1:
            normalised_dict[key] = dict[key]
            continue

        if len(dict[key]) > 0:
            normalised_dict[key] = dict[key][0]
            continue
            
        normalised_dict[key] = None

    return normalised_dict

def lambda_handler(event, context):
    status_callback = parse_qs(event['body'])
    status_callback = normalise_dict(status_callback)

    if status_callback['StatusCallbackEvent'] == 'composition-available':
        dispatch(status_callback, 'twilio_composition_available')

    if status_callback['StatusCallbackEvent'] == 'composition-failed':
        dispatch(status_callback, 'twilio_composition_failure')

    if status_callback['StatusCallbackEvent'] == 'room-ended':
        dispatch(status_callback, 'twilio_room_ended')

    return {
        'statusCode': 200,
        'body': json.dumps(status_callback),
    }
