def lambda_handler(event, context):
    print('## EVENT')
    print(event)

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': '{}'
    }
