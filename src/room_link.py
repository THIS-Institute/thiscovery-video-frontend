import json
from dynamodb import DynamoDB
from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    request = json.loads(event['body'])

    try:
        room_sid = request['roomSid']
        appointment_id = request['appointmentId']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='Missing parameters',
        ).response()

    dynamo = DynamoDB().client()

    dynamo.update_item(
            Key={
                'pk': f'APPOINTMENT#{appointment_id}',
                'sk': 'INFO',
            },
            UpdateExpression='SET room_sid = :sid',
            ExpressionAttributeValues={
                ':sid': room_sid,
            },
        )

    return ApiGatewayResponse(data={'message': 'ok'}).response()
