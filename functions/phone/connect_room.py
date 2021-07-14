import json
from twilio.twiml.voice_response import VoiceResponse, Say

def lambda_handler(event, context):
    request = json.loads(event['body'])

    digits = request['Digits']

    response = VoiceResponse()

    say = Say('Thank you.', voice='Polly.Amy', language='en-GB')
    say.append('Your pin is:')
    say.say_as(digits, interpret_as='telephone')

    response.append(say)

    return {
        'statusCode': 200,
        'body': str(response)
    }
