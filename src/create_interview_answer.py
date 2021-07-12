import os
import json
import uuid
import boto3
from api.responses import ApiGatewayResponse
from dynamodb import DynamoDB
from events import Event, EventBridge

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

    interview_id = request['interviewId']
    anon_user_id = request['anonUserId']
    anon_user_task_id = request['anonUserTaskId']
    project_task_id = request['projectTaskId']
    task_id = request['taskId']
    question_id = request['questionId']
    question_name = request['questionName']
    question_seq = request['questionSequence']
    question_started_at = request['questionStartedAt']
    question_ended_at = request['questionEndedAt']
    response_started_at = request['responseStartedAt']
    response_ended_at = request['responseEndedAt']
    retake_count = request['retakeCount']

    uid = uuid.uuid4()
    uuid_string = str(uid)

    db = DynamoDB().client()

    db.update_item(
        Key={
            'pk': f'INTERVIEW#{interview_id}',
            'sk': f'INTERVIEW#{interview_id}',
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
            'pk': f'INTERVIEW#{interview_id}',
            'sk': f'ANSWER#{uuid_string}',
            'answer_id': uuid_string,
            'task_id': task_id,
            'user_id': anon_user_id,
            'question_id': question_id,
            'sequence': question_seq,
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
            'interview_id': interview_id,
            'anon_user_id': anon_user_id,
            'anon_user_task_id': anon_user_task_id,
            'project_task_id': project_task_id,
            'task_id': task_id,
            'question_id': question_id,
            'question_name': question_name,
            'sequence': question_seq,
        },
    }

    presigned_url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params=params,
        ExpiresIn=900
    )

    event = Event(
        source='thiscovery_video',
        detail_type='interview_question_completed',
        detail={
            'interview_id': interview_id,
            'anon_project_specific_user_id': anon_user_id,
            'anon_user_task_id': anon_user_task_id,
            'project_task_id': project_task_id,
            'question_started_at': question_started_at,
            'question_ended_at': question_ended_at,
            'response_started_at': response_started_at,
            'response_ended_at': response_ended_at,
            'retake_count': retake_count,
            'question_id': question_id,
            'question_sequence_no': question_seq,
            'question_name': question_name,
        },
    )

    EventBridge().put_event(event)

    response = {
        'videoUploadUrl': presigned_url,
    }

    return ApiGatewayResponse(data=response).response()
