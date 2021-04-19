import os
import json
import uuid
import boto3
from datetime import datetime
from models import interview

def lambda_handler(event, context):
    uid = uuid.uuid4()

    s3 = boto3.client('s3')

    params = {
        'Bucket': os.environ['BUCKET_NAME'],
        'Key': str(uid),
    }

    presigned_url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params=params,
        Expires=900,
    )

    response = {
        'videoUploadUrl': presigned_url,
    }

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps(response)
    }
