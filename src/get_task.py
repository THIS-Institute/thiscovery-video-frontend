import os
import json

from dynamodb import DynamoDB
from botocore.exceptions import ClientError
from api.responses import ApiGatewayResponse

def lambda_handler(event, context):
    request = json.loads(event['body'])

    task_id = '0fda6eff-b1e5-44df-93b4-3d71c03adeff'
    user_id = request['userId']

    table = DynamoDB().client()

    appointment = None

    try:
        user_task = table.get_item(Key={
            'pk': f'USER#{user_id}',
            'sk': f'TASK#{task_id}',
        })
        item = user_task['Item']
    except ClientError as error:
        if error.response['Error']['Code'] == 'ResourceNotFoundException':
            user_task = None
        else:
            raise
    except KeyError:
        user_task = None
    except:
        raise
    
    if user_task:
        try:
            appointment = {
                'id': item['appointment_id'],
                'time': item['appointment_time'],
            }
        except KeyError:
            appointment = None

    response = {
        'id': task_id,
        'acuityTypeId': '20973054',
        'onDemandAvailable': True,
        'liveAvailable': True,
        'title': 'Learning from intensive caffeine experiences',
        'completionUrl': 'https://www.thiscovery.org/',
        'appointment': appointment,
    }

    return ApiGatewayResponse(data=response).response()
