import json
from datetime import datetime
from thiscovery.user_response import UserResponseService, ResponseNotFound
from dynamodb import DynamoDB
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

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
    interview_id = None

    anon_user_id = thiscovery_response['anon_project_specific_user_id']

    gsi_pk = Key('GSI1PK').eq(f'USER#{anon_user_id}')
    gsi_sk = Key('GSI1SK').eq(f'TASK#{task_id}')

    response = table.query(
        IndexName='GSI1',
        KeyConditionExpression=gsi_pk & gsi_sk,
    )

    if response['Count'] > 0:
        item = response['Items'][0]
        
        try:
            interview_id = item['interview_id']
        except KeyError:
            interview_id = None

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
        'interviewId': interview_id,
        'anonUserId': anon_user_id,
        'anonUserTaskId': thiscovery_response['anon_user_task_id'],
        'projectTaskId': task['project_task_id'],
        'acuityTypeId': task['appointment_type_id'],
        'onDemandAvailable': task['on_demand_available'],
        'liveAvailable': task['live_available'],
        'title': task['name'],
        'completionUrl': task['completion_url'],
        'appointment': appointment,
    }

    return ApiGatewayResponse(data=response).response()
