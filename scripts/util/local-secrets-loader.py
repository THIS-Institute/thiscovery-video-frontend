import sys
import os
import json
import boto3

secrets = json.load(sys.stdin)

secrets_manager = boto3.client(
    service_name='secretsmanager',
    endpoint_url=os.environ['LOCAL_AWS_ENDPOINT'],
    region_name=os.environ['AWS_REGION'],
    aws_access_key_id='xx',
    aws_secret_access_key='xx',
)

def create_secret(key, value):
    return secrets_manager.create_secret(
        Name=key,
        SecretString=value,
    )

def update_secret(key, value):
    return secrets_manager.put_secret_value(
        SecretId=key,
        SecretString=value,
    )

def build_namespaced_key(key):
    return os.environ['SECRETS_NAMESPACE'] + secret_key

secrets_list = secrets_manager.list_secrets()['SecretList']
existing_secrets = set()

for secret in secrets_list:
    existing_secrets.add(secret['Name'])

for secret_key, secret_value in secrets.items():
    secret_id = build_namespaced_key(secret_key)

    if secret_id in existing_secrets:
        print(f'--> Updating {secret_id}')
        response = update_secret(secret_id, secret_value)
    else:
        print(f'--> Creating {secret_id}')
        response = create_secret(secret_id, secret_value)
        secrets_list.append(response)

print('\nAvailable secrets:')
for secret in secrets_list:
    print('- ' + secret['ARN'])
