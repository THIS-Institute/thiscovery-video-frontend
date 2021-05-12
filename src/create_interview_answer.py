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
    uuid_string = str(uid)

    db = DynamoDB().client()

    db.update_item(
        Key={
            'pk': f'USER#{user_id}',
            'sk': f'TASK#{task_id}',
        },
        UpdateExpression='SET #answers = list_append(if_not_exists(#answers, :empty_list), :answer_key)',
        ExpressionAttributeNames={
            '#answers': 'answers',
        },
        ExpressionAttributeValues={
            ':answer_key': [uuid_string],
            ':empty_list': [],
        },
    )

    db.put_item(
        Item={
            'pk': f'USER#{user_id}',
            'sk': f'ANSWER#{uuid_string}',
            'uuid': uuid_string,
            'task': task_id,
            'user': user_id,
            'question_id': question_id,
        }
    )

    s3 = boto3.client('s3')

    params = {
        'Bucket': os.environ['BUCKET_NAME'],
        'Key': f'unprocessed/{str(uuid_string)}',
        'ContentType': request['contentType'],
        'Metadata': {
            'user_id': user_id,
            'task_id': task_id,
            'question_id': question_id,
        },
    }

    presigned_url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params=params,
        ExpiresIn=900
    )

    response = {
        'videoUploadUrl': presigned_url,
    }

    return ApiGatewayResponse(data=response).response()
