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
        interview_id = request['interviewId']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='Missing parameters',
        ).response()

    table = DynamoDB().client()

    table.put_item(
        Item={
            'pk': f'ROOM#{room_sid}',
            'sk': f'ROOM#{room_sid}',
            'GSI1PK': f'INTERVIEW#{interview_id}',
            'GSI1SK': f'ROOM#{room_sid}',
            'sid': room_sid,
        }
    )

    return ApiGatewayResponse(data={'message': 'ok'}).response()
