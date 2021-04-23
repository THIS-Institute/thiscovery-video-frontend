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
            'blocks': [
                {
                    'id': 'BL_eQESIsA5b3xfWn3',
                    'title': 'Introductory questions',
                    'questions': [
                        {
                            'id': 'QID1',
                            'name': 'Question 1',
                            'sequence': '1',
                            'title': 'Think about the last time you had coffee. How did it make you feel?',
                            'description': None,
                        },
                        {
                            'id': 'QID2',
                            'name': 'Question 2',
                            'sequence': '2',
                            'title': 'Do you associate any rituals with your coffee consumption?',
                            'description': 'For example; drinking coffee in bed, after a meal, while smoking.',
                        }
                    ]
                },
                {
                    'id': 'BL_3qH1dnbq50y9V0a',
                    'title': 'Coffee consumption',
                    'questions': [
                        {
                            'id': 'QID3',
                            'name': 'Question 3',
                            'sequence': '3',
                            'title': 'Think about a time when you were unable to have access to coffee. How did this make you feel?',
                            'description': 'For example, you did not have coffee available or you were not allowed to have coffee for medical reasons.',
                        },
                        {
                            'id': 'QID4',
                            'name': 'Question 4',
                            'sequence': '4',
                            'title': 'Do you have any concerns about your coffee consumption?',
                            'description': None,
                        },
                        {
                            'id': 'QID5',
                            'name': 'Question 5',
                            'sequence': '5',
                            'title': 'What would persuade you to stop consuming coffee?',
                            'description': None,
                        }
                    ]
                }
            ],
        }),
    }
