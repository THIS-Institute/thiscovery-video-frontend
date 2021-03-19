def lambda_handler(event, context):
    print('## EVENT')
    print(event)

    return {
        'statusCode': 200,
        'body': '{}'
    }
