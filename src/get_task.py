import json
from datetime import datetime
from thiscovery.user_response import UserResponseService, ResponseNotFound
from dynamodb import DynamoDB
from botocore.exceptions import ClientError

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    try:
        response_id = event['pathParameters']['key']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='response id is required',
        ).response()
        
    request = json.loads(event['body'])
    user_id = request['userId']

    try:
        user_responses = UserResponseService()
        thiscovery_response = user_responses.get(response_id)
    except ResponseNotFound:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_NOT_FOUND,
            message='Response not found',
            http_code=404
        ).response()

    task_id = thiscovery_response['interview_task_id']
    table = DynamoDB().client()
    appointment = None

    try:
        user_task = table.get_item(Key={
            'pk': f'USER#{user_id}',
            'sk': f'TASK#{task_id}',
        })
        item = user_task['Item']
    except ClientError as error:
        if error.response['Error']['Code'] == 'ResourceNotFoundException':
            user_task = None
        else:
            raise
    except KeyError:
        user_task = None
    except:
        raise
    
    if user_task:
        try:
            appointment = {
                'id': item['appointment_id'],
                'time': item['appointment_time'],
            }
        except KeyError:
            appointment = None

    if appointment:
        appointment_date = datetime.strptime(appointment['time'], '%Y-%m-%dT%H:%M:%S%z').date()
        today_date = datetime.today().date()
        appointment['isToday'] = appointment_date == today_date

    task = thiscovery_response['interview_task']

    response = {
        'id': task_id,
        'acuityTypeId': task['appointment_type_id'],
        'onDemandAvailable': task['on_demand_available'],
        'liveAvailable': task['live_available'],
        'title': task['name'],
        'completionUrl': task['completion_url'],
        'appointment': appointment,
    }

    return ApiGatewayResponse(data=response).response()
