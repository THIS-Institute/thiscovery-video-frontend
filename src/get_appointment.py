from dynamodb import DynamoDB
from thiscovery.task import TaskService, TaskNotFound

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    try:
        appointment_id = event['pathParameters']['id']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='appointment id is required',
        ).response()

    dynamodb = DynamoDB().client()

    response = dynamodb.get_item(Key={
        'pk': f'APPOINTMENT#{appointment_id}',
        'sk': 'INFO',
    })

    try:
        appointment = response['Item']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_NOT_FOUND,
            message='Appointment not found',
            http_code=404
        ).response()

    try:
        thiscovery_tasks = TaskService()
        task = thiscovery_tasks.get(appointment['task_id'])
    except (TaskNotFound, KeyError):
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_NOT_FOUND,
            message='Task not found',
            http_code=404
        ).response()

    response_data = {
        'appointment': {
            'id': appointment['id'],
            'time': appointment['appointment_time'],
        },
        'task': {
            'id': appointment['task_id'],
            'title': task['name'],
            'completionUrl': task['completion_url'],
        },
    }

    return ApiGatewayResponse(data=response_data).response()

