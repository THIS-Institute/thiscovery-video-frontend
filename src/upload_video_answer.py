import os
import json
import boto3

def lambda_handler(event, context):
    event_filename = event['requestContext']['extendedRequestId']

    s3 = boto3.resource('s3')

    s3.put_object(
        Key=event_filename + '.json',
        Bucket=os.environ['BUCKET_NAME'],
        Body=event.encode('utf-8'),
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
