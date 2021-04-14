import os
import json
import base64, sys
import boto3
from cgi import parse_multipart, FieldStorage
from io import BytesIO

def lambda_handler(event, context):
    if event['isBase64Encoded']:
        data = base64.b64decode(event['body'])
    else:
        data = event['body'].encode('utf-8')

    body_file = BytesIO(data)

    fs = FieldStorage(
        fp=body_file,
        headers=event['headers'],
        environ={'REQUEST_METHOD':'POST', 'CONTENT_TYPE':event['headers']['content-type']}
    )

    print(fs)

    # print(fs)

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
