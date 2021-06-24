import json
import os
import subprocess
import shlex
import boto3
from events import Event, EventBridge

OUTPUT_EXTENSION = 'mp4'
OUTPUT_TYPE = 'video/mp4'

def lambda_handler(event, context):
    event_record = event['Records'][0]
    bucket_name = event_record['s3']['bucket']['name']
    s3_source_key = event_record['s3']['object']['key']

    s3_source_basename = os.path.splitext(os.path.basename(s3_source_key))[0]
    s3_destination_filename = f'{s3_source_basename}.{OUTPUT_EXTENSION}'

    s3 = boto3.client('s3')

    s3_object = s3.get_object(
        Bucket=bucket_name,
        Key=s3_source_key,
    )

    metadata = s3_object['Metadata']

    s3_source_signed_url = s3.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': bucket_name,
            'Key': s3_source_key,
        },
        ExpiresIn=60
    )

    temp_file_path = f'/tmp/{s3_destination_filename}'

    ffmpeg_command = f'/opt/bin/ffmpeg -i "{s3_source_signed_url}" -c copy -c:a aac {temp_file_path}'
    command = shlex.split(ffmpeg_command)
    process = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    if process.stderr:
        print(process.stderr)

    interview_id = metadata['interview_id']
    destination_key = f'interviews/self-record/{interview_id}/{s3_destination_filename}'

    s3.upload_file(
        Filename=temp_file_path,
        Bucket=bucket_name,
        Key=destination_key,
        ExtraArgs={
            'ContentType': OUTPUT_TYPE,
            'Metadata': metadata,
        },
    )

    os.remove(temp_file_path)

    url = f'https://{bucket_name}.s3.eu-west-1.amazonaws.com/{destination_key}'

    event = Event(
        source='thiscovery_video',
        detail_type='interview_file_uploaded',
        detail={
            'interview_type': 'on-demand',
            'interview_id': interview_id,
            'anon_project_specific_user_id': metadata['anon_user_id'],
            'anon_user_task_id': metadata['anon_user_task_id'],
            'question_id': metadata['question_id'],
            'question_sequence_no': metadata['sequence'],
            's3_uri': url,
        },
    )

    EventBridge().put_event(event)

    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Processing complete'
        })
    }
