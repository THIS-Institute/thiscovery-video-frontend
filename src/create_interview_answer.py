import os
import json
import uuid
import boto3
from datetime import datetime
from api.responses import ApiGatewayResponse

def lambda_handler(event, context):
    request = json.loads(event['body'])

    uid = uuid.uuid4()

    s3 = boto3.client('s3')

    params = {
        'Bucket': os.environ['BUCKET_NAME'],
        'Key': f'unprocessed/{str(uid)}',
        'ContentType': request['contentType'],
    }

    presigned_url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params=params,
        ExpiresIn=900,
    )

    response = {
        'videoUploadUrl': presigned_url,
    }

    return ApiGatewayResponse(data=response).response()
