import json
from urllib.parse import parse_qs

def lambda_handler(event, context):
    status_callback = parse_qs(event['body'])

    print(status_callback)

    return {
        'statusCode': 200,
        'body': json.dumps(status_callback),
    }
