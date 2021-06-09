import os
import json
from dynamodb import DynamoDB

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

    response = dynamodb.get_item(
        Key={
            'pk': f'APPOINTMENT#{appointment_id}',
            'sk': 'INFO',
        },
    )

    print(response)

    return ApiGatewayResponse(data={'message': 'ok'}).response()

