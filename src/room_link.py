import json
from dynamodb import DynamoDB
from events import Event, EventBridge
from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    request = json.loads(event['body'])

    try:
        room_sid = request['roomSid']
        interview_id = request['interviewId']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='Missing parameters',
        ).response()

    table = DynamoDB().client()

    pk = f'ROOM#{room_sid}'

    existing_room = table.get_item(Key={
        'pk': pk,
        'sk': pk,
    })

    if 'Item' in existing_room:
        return ApiGatewayResponse(data={'message': 'ok'}).response()

    table.put_item(
        Item={
            'pk': pk,
            'sk': pk,
            'GSI1PK': f'INTERVIEW#{interview_id}',
            'GSI1SK': pk,
            'sid': room_sid,
        }
    )

    result = table.get_item(Key={
        'pk': f'INTERVIEW#{interview_id}',
        'sk': f'INTERVIEW#{interview_id}',
    })

    interview = result['Item']

    create_event(
        event_type='interview_started',
        interview_id=interview_id,
        anon_user_id=interview['user_id'],
        anon_user_task_id=interview['anon_user_task_id'],
        project_task_id=interview['project_task_id'],
    )

    return ApiGatewayResponse(data={'message': 'ok'}).response()

def create_event(event_type, interview_id, anon_user_id, anon_user_task_id, project_task_id):
    event = Event(
        source='thiscovery_video',
        detail_type=event_type,
        detail={
            'interview_id': interview_id,
            'anon_project_specific_user_id': anon_user_id,
            'anon_user_task_id': anon_user_task_id,
            'project_task_id': project_task_id,
        },
    )

    EventBridge().put_event(event)
