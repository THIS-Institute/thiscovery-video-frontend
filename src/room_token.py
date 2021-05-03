import json
import os
from secrets import SecretsManager
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def get_access_token(identity, room):
    secret = SecretsManager(os.environ['SECRETS_NAMESPACE'])

    token = AccessToken(
        os.environ['TWILIO_ACCOUNT_SID'],
        secret.get('twilio-api-key'),
        secret.get('twilio-api-secret'),
    )
    
    token.identity = identity
    
    grant = VideoGrant()
    grant.room = room
    token.add_grant(grant)
    
    return token.to_jwt()

def lambda_handler(event, context):
    request = json.loads(event['body'])

    try:
        identity = request['identity']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='identity is required',
        ).response()

    try:
        room = request['room']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='room is required',
        ).response()

    token = get_access_token(
        identity=identity,
        room=room
    )

    response = {
        'access_token': token.decode('utf-8')
    }

    return ApiGatewayResponse(data=response).response()
