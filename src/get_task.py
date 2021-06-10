import json
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
        response = user_responses.get(response_id)
    except ResponseNotFound:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_NOT_FOUND,
            message='Response not found',
            http_code=404
        ).response()

    task_id = response['interview_task_id']
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

    response = {
        'id': response['interview_task_id'],
        'acuityTypeId': response['appointment_type_id'],
        'onDemandAvailable': response['on_demand_available'],
        'liveAvailable': response['live_available'],
        'title': response['name'],
        'completionUrl': response['completion_url'],
        'appointment': appointment,
    }

    return ApiGatewayResponse(data=response).response()
