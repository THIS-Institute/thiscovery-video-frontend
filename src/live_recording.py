import os
import json
import boto3
from urllib.request import urlopen
from secrets import SecretsManager
from twilio.rest import Client
from dynamodb import DynamoDB
from events import Event, EventBridge

def lambda_handler(event, context):
    detail = event['detail']

    secret = SecretsManager(os.environ['SECRETS_NAMESPACE'])

    client = Client(
        secret.get('twilio-api-key'),
        secret.get('twilio-api-secret')
    )

    composition_url = detail['MediaUri']
    room_sid = detail['RoomSid']

    table = DynamoDB().client()

    response = table.get_item(Key={
        'pk': f'ROOM#{room_sid}',
        'sk': f'ROOM#{room_sid}',
    })

    gsi_pk = response['Item']['GSI1PK']

    response = table.get_item(Key={
        'pk': gsi_pk,
        'sk': gsi_pk,
    })

    interview = response['Item']

    interview_id = interview['interview_id']
    anon_user_id = interview['user_id']
    anon_user_task_id = interview['anon_user_task_id']

    uri = f'https://video.twilio.com{composition_url}'
    response = client.request('GET', uri)

    media_location = json.loads(response.text).get('redirect_to')

    temp_file = f'/tmp/{room_sid}.mp4'

    with open (temp_file, 'wb') as file:
        file.write(urlopen(media_location).read())

    destination_bucket = os.environ['BUCKET_NAME']
    destination_key = f'interviews/live/{interview_id}.mp4'

    s3 = boto3.client('s3')

    s3.upload_file(
        Filename=temp_file,
        Bucket=destination_bucket,
        Key=destination_key,
        ExtraArgs={
            'ContentType': 'video/mp4',
            'Metadata': {
                'interview_id': interview_id,
                'anon_user_id': anon_user_id,
                'anon_user_task_id': anon_user_task_id,
                'twilio_room_sid': room_sid,
            },
        },
    )

    os.remove(temp_file)

    # TODO: enable deletes
    # client.video.compositions(detail['CompositionSid']).delete()

    url = f'https://{destination_bucket}.s3.eu-west-1.amazonaws.com/{destination_key}'

    event = Event(
        source='thiscovery_video',
        detail_type='interview_file_uploaded',
        detail={
            'interview_type': 'live',
            'interview_id': interview_id,
            'anon_project_specific_user_id': anon_user_id,
            'anon_user_task_id': anon_user_task_id,
            's3_uri': url,
        },
    )

    EventBridge().put_event(event)

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'ok'}),
    }
