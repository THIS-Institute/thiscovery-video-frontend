import os
import json
import uuid
import boto3
from api.responses import ApiGatewayResponse
from dynamodb import DynamoDB

def guess_extension(content_type):
    content_type_map = {
        'video/webm': '.webm',
        'video/mp4': '.mp4',
        'video/x-matroska': '.mkv',
    }

    for type in content_type_map:
        if type in content_type:
            return content_type_map[type]
    
    return None

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

    content_type = request['contentType']
    object_key = f'unprocessed/{str(uuid_string)}'

    possible_file_extension  = guess_extension(content_type)

    if possible_file_extension:
        object_key += possible_file_extension

    params = {
        'Bucket': os.environ['BUCKET_NAME'],
        'Key': object_key,
        'ContentType': content_type,
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
