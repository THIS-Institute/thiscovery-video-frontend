import json
from urllib.parse import parse_qs
from twilio.twiml.voice_response import VoiceResponse, Say

def lambda_handler(event, context):
    phone_callback = parse_qs(event['body'])
    phone_callback = normalise_dict(phone_callback)

    digits = phone_callback['Digits']

    response = VoiceResponse()

    say = Say('Thank you.', voice='Polly.Amy', language='en-GB')
    say.append('Your pin is:')
    say.say_as(digits, interpret_as='telephone')

    response.append(say)

    return {
        'headers': {
            'Content-Type': 'text/xml',
        },
        'statusCode': 200,
        'body': str(response)
    }

def normalise_dict(dict):
    normalised_dict = {}

    for key in dict:
        if len(dict[key]) > 1:
            normalised_dict[key] = dict[key]
            continue

        if len(dict[key]) > 0:
            normalised_dict[key] = dict[key][0]
            continue
            
        normalised_dict[key] = None

    return normalised_dict
