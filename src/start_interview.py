import json
import uuid
from interviews.questions import Questions
from thiscovery.task import TaskService
from events import Event, EventBridge
from dynamodb import DynamoDB

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    request = json.loads(event['body'])

    try:
        task_id = request['taskId']
        anon_user_id = request['anonUserId']
        anon_user_task_id = request['anonUserTaskId']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='body missing required parameters',
        ).response()

    thiscovery_tasks = TaskService()
    task = thiscovery_tasks.get(task_id)

    thiscovery_questions = Questions(task['on_demand_survey_id'])

    survey = thiscovery_questions.get_task_survey()
    questions  = thiscovery_questions.format_as_self_record(survey)

    db = DynamoDB().client()

    existing_interview = db.get_item(Key={
        'pk': f'USER#{anon_user_id}',
        'sk': f'TASK#{task_id}',
    })

    progress = None

    if 'Item' in existing_interview:
        item = existing_interview['Item']

        if 'progress' in item:
            progress = item['progress']

        create_event(
            event_type='interview_resumed',
            interview_id=item['interview_id'],
            anon_user_id=anon_user_id,
            anon_user_task_id=anon_user_task_id,
        )
    else:
        interview_id = str(uuid.uuid4())

        db.put_item(
            Item={
                'pk': f'USER#{anon_user_id}',
                'sk': f'TASK#{task_id}',
                'interview_id': interview_id,
                'user_id': anon_user_id,
                'task_id': task_id,
                'anon_user_task_id': anon_user_task_id,
                'track': 'self_record',
            }
        )

        create_event(
            event_type='interview_started',
            interview_id=interview_id,
            anon_user_id=anon_user_id,
            anon_user_task_id=anon_user_task_id,
        )

    response = {
        'progress': progress,
        'interviewQuestions': {
            'blocks': questions,
        },
    }

    return ApiGatewayResponse(data=response).response()

def create_event(event_type, interview_id, anon_user_id, anon_user_task_id):
        event = Event(
            source='thiscovery_video',
            detail_type=event_type,
            detail={
                'interview_id': interview_id,
                'anon_project_specific_user_id': anon_user_id,
                'anon_user_task_id': anon_user_task_id,
            },
        )

        EventBridge().put_event(event)
