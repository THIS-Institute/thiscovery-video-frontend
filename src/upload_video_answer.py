import os
import json
import base64
from requests_toolbelt.multipart import decoder

def lambda_handler(event, context):
    form_data = base64.b64decode(event['body'])

    multipart_data = MultipartDecoder(form_data, 'multipart/form-data')

    for part in multipart_data.parts:
        print(part)

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 201,
        'body': json.dumps({
            'message': 'Video uploaded'
        })
    }
