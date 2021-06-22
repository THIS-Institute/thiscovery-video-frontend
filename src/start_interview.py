import json
import uuid
from interviews.questions import Questions
from thiscovery.task import TaskService
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

    if not 'Item' in existing_interview:
        interview_id = str(uuid.uuid4())

        db.put_item(
            Item={
                'pk': f'USER#{anon_user_id}',
                'sk': f'TASK#{task_id}',
                'interview_id': interview_id,
                'track': 'self_record',
            }
        )

    response = {
        'blocks': questions,
    }

    return ApiGatewayResponse(data=response).response()
