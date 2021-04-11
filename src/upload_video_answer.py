import os
import json
import base64

def lambda_handler(event, context):
    form_data = base64.b64decode(event['body'])

    print(form_data)

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
