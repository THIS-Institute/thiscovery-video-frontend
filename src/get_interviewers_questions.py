import json
from time import sleep

def lambda_handler(event, context):
    sleep(0.1)

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps({
            'questions': [
                {
                    'name': 'Q1',
                    'title': 'How are you this morning?',
                },
                {
                    'name': 'Q2',
                    'title': 'What are you planning to do this afternoon?',
                },
                {
                    'name': 'Q3',
                    'title': 'How many thiscovery tasks have you completed to date?',
                },
                {
                    'name': 'Q4',
                    'title': 'Would you recommend thiscovery to a friend?',
                }
            ],
        }),
    }
