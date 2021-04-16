import json
import uuid
import boto3
from datetime import datetime
from models import interview

def lambda_handler(event, context):
    uid = uuid.uuid4()
    # time_now = datetime.now()

    response = {
        'videoKey': str(uid),
    }

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps(response)
    }
