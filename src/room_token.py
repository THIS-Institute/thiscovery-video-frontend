import json
import os
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant

def get_access_token(identity, room):
    token = AccessToken(
        os.environ['TWILIO_ACCOUNT_SID'],
        os.environ['TWILIO_API_KEY'],
        os.environ['TWILIO_API_SECRET']
    )
    
    token.identity = identity
    
    grant = VideoGrant()
    grant.room = room
    token.add_grant(grant)
    
    return token.to_jwt()

def get_error_response(message):
    response_body = {
        'error': True,
        'message': message
    }

    return {
        'statusCode': 422,
        'body': json.dumps(response_body)
    }

def get_token_response(token):
    response = {
        'access_token': token.decode('utf-8')
    }

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps(response)
    }

def lambda_handler(event, context):
    request_body = json.loads(event['body'])

    if not 'identity' in request_body:
        return get_error_response(message='Request must contain identity')

    if not 'room' in request_body:
        return get_error_response(message='Request must contain room UUID')

    token = get_access_token(identity=request_body['identity'], room=request_body['room'])

    return get_token_response(token=token)
