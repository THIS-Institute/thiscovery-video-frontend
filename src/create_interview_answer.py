import os
import json
import uuid
import boto3
from datetime import datetime
from api.responses import ApiGatewayResponse

from dynamodb import DynamoDB

def lambda_handler(event, context):
    request = json.loads(event['body'])

    user_id = request['userId']
    task_id = request['taskId']
    question_id = request['questionId']

    uid = uuid.uuid4()

    answer = {
        'uuid': uid,
        'question_id': question_id,
        'notes': None,
        'video_url': None,
        'uploaded': False,
    }

    db = DynamoDB().client()
    db.update_item(
        Key={
            'pk': f'USER#{user_id}',
            'sk': f'TASK#{task_id}',
        },
        UpdateExpression='SET answers.#uid = :answer',
        ExpressionAttributeNames={
            '#uid': uid,
        },
        ExpressionAttributeValues={
            ':key': uid,
            ':answer': answer,
        },
    )

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
