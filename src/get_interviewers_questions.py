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
                    'name': 'Question 1',
                    'title': 'Think about the last time you had coffee. How did it make you feel?',
                },
                {
                    'name': 'Question 2',
                    'title': 'Do you associate any rituals with your coffee consumption?',
                },
                {
                    'name': 'Question 3',
                    'title': 'Think about a time when you were unable to have access to coffee. How did this make you feel?',
                },
                {
                    'name': 'Question 4',
                    'title': 'Do you have any concerns about your coffee consumption?',
                },
                {
                    'name': 'Question 5',
                    'title': 'What would persuade you to stop consuming coffee?',
                }
            ],
        }),
    }
