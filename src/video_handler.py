import json
import os
import subprocess
import shlex
import boto3

def lambda_handler(event, context):
    event_record = event['Records'][0]
    bucket_name = event_record['s3']['bucket']['name']
    s3_source_key = event_record['s3']['object']['key']

    s3_source_basename = os.path.splitext(os.path.basename(s3_source_key))[0]
    s3_destination_filename = f'processed/{s3_source_basename}.mp4'

    s3 = boto3.client('s3')
    s3_source_signed_url = s3.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': bucket_name,
            'Key': s3_source_key,
        },
        ExpiresIn=60
    )

    ffmpeg_command = f'/opt/bin/ffmpeg -i "{s3_source_signed_url}" -c copy -'
    command = shlex.split(ffmpeg_command)
    process = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    s3.put_object(
        Body=process.stdout,
        Bucket=bucket_name,
        Key=s3_destination_filename
    )

    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Processing complete'
        })
    }
