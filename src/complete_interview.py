from events import Event, EventBridge
from dynamodb import DynamoDB

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    try:
        interview_id = event['pathParameters']['id']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='Interview id is required',
        ).response()

    db = DynamoDB().client()

    row_key = {
        'pk': f'INTERVIEW#{interview_id}',
        'sk': f'INTERVIEW#{interview_id}',
    }

    response = db.get_item(Key=row_key)

    try:
        interview_item = response['Item']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_NOT_FOUND,
            message='Interview not found',
        ).response()

    create_event(
        event_type='interview_completed',
        interview_id=interview_id,
        anon_user_id=interview_item['user_id'],
        anon_user_task_id=interview_item['anon_user_task_id'],
        project_task_id=interview_item['project_task_id'],
    )

    response = {
        'action': 'complete',
    }

    return ApiGatewayResponse(data=response).response()

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
