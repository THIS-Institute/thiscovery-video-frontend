import os
import json
import base64, sys
import boto3
from cgi import FieldStorage
from io import BytesIO

def lambda_handler(event, context):
    if event['isBase64Encoded']:
        data = base64.b64decode(event['body'])
    else:
        data = event['body'].encode('utf-8')

    body_file = BytesIO(data)

    field_storage = FieldStorage(
        fp=body_file,
        headers=event['headers'],
        environ={
            'REQUEST_METHOD': event['httpMethod'],
            'CONTENT_TYPE': event['headers']['content-type'],
        },
    )

    try:
        video = field_storage['video']
    except KeyError:
        return {
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'statusCode': 422,
            'body': json.dumps({
                'error': 'KeyError'
            })
        }
    except:
        raise

    event_filename = event['requestContext']['requestId']

    s3 = boto3.client('s3')

    s3.put_object(
        Key=f'unprocessed/{event_filename}',
        Bucket=os.environ['BUCKET_NAME'],
        Body=video.file.read(),
        ContentType=video.type,
    )

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
