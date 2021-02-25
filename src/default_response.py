import json

def lambda_handler(event, context):
    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps({})
    }
