import os
import json
import boto3
from urllib.request import urlopen
from secrets import SecretsManager
from twilio.rest import Client

def lambda_handler(event, context):
    detail = event['detail']

    secret = SecretsManager(os.environ['SECRETS_NAMESPACE'])

    client = Client(
        secret.get('twilio-api-key'),
        secret.get('twilio-api-secret')
    )

    composition_url = detail['MediaUri']
    room_sid = detail['RoomSid']

    uri = f'https://video.twilio.com{composition_url}'
    response = client.request('GET', uri)

    media_location = json.loads(response.text).get('redirect_to')

    temp_file = f'/tmp/{room_sid}.mp4'

    with open (temp_file, 'wb') as file:
        file.write(urlopen(media_location).read())

    s3 = boto3.client('s3')

    s3.upload_file(
        Filename=temp_file,
        Bucket=os.environ['BUCKET_NAME'],
        Key=f'live/{room_sid}.mp4',
    )

    os.remove(temp_file)

    # client.video.compositions(detail['CompositionSid']).delete()

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'ok'}),
    }
