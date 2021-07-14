from twilio.twiml.voice_response import VoiceResponse, Gather

def lambda_handler(event, context):
    response = VoiceResponse()

    action = 'https://dev1-api-video.thiscovery.org/v1/phone/connect-room'

    gather = Gather(num_digits=4, action=action)

    gather.say(
        message='Hello, welcome to Thiscovery. To continue, please enter your room pin, followed by the hash key.',
        voice='Polly.Amy',
        language='en-GB',
    )

    response.append(gather)

    return {
        'statusCode': 200,
        'body': str(response)
    }
