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
                            'name': 'Q1',
                            'sequence': '1',
                            'title': 'How are you this morning?',
                            'description': 'Please take a minute to reflect on how you feel and/or things you are grateful for this morning.'
                        },
                        {
                            'id': 'QID2',
                            'name': 'Q2',
                            'sequence': '2',
                            'title': 'What are you planning to do this afternoon?',
                            'description': 'Are you planning to bake cakes? Going on a bike ride? Maybe going on a bike ride and then eating cake? Whatever your plans are, please don\'t be shy to share.'
                        }
                    ]
                },
                {
                    'id': 'BL_3qH1dnbq50y9V0a',
                    'title': 'Your experience using thiscovery',
                    'questions': [
                        {
                            'id': 'QID3',
                            'name': 'Q3',
                            'sequence': '3',
                            'title': 'How many thiscovery tasks have you completed to date?',
                            'description': None
                        },
                        {
                            'id': 'QID4',
                            'name': 'Q4',
                            'sequence': '4',
                            'title': 'Would you recommend thiscovery to a friend?',
                            'description': 'If you enjoyed using thiscovery, why not spread the word?'
                        }
                    ]
                }
            ],
        }),
    }
