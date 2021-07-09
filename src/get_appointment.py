from dynamodb import DynamoDB
from thiscovery.task import TaskService, TaskNotFound

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
            message='appointment id is required',
        ).response()

    dynamodb = DynamoDB().client()

    response = dynamodb.get_item(Key={
        'pk': f'INTERVIEW#{interview_id}',
        'sk': f'INTERVIEW#{interview_id}',
    })

    try:
        interview = response['Item']
        appointment_id = interview['appointment_id']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_NOT_FOUND,
            message='Interview not found',
            http_code=404
        ).response()

    try:
        thiscovery_tasks = TaskService()
        task = thiscovery_tasks.get(interview['task_id'])
    except (TaskNotFound, KeyError):
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_NOT_FOUND,
            message='Task not found',
            http_code=404
        ).response()

    response_data = {
        'interviewId': interview['interview_id'],
        'appointment': {
            'id': appointment_id,
            'time': interview['appointment_time'],
        },
        'task': {
            'id': interview['task_id'],
            'title': task['name'],
            'completionUrl': task['completion_url'],
        },
    }

    return ApiGatewayResponse(data=response_data).response()
