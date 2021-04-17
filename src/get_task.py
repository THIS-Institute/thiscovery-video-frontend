import os
import json

def lambda_handler(event, context):
    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps({
            'id': '0fda6eff-b1e5-44df-93b4-3d71c03adeff',
            'acuityTypeId': '20973054',
            'onDemandAvailable': True,
            'liveAvailable': True,
            'title': 'Suggest recommendation for good practice',
            'completionUrl': 'https://www.thiscovery.org/',
        }),
    }
