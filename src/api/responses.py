import json

class ApiGatewayResponse():
    def __init__(self, data, http_code=200):
        self.data = data
        self.http_code = http_code

    def response(self):
        return {
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            'statusCode': self.http_code,
            'body': json.dumps(self.data),
        }

class ApiGatewayErrorResponse(ApiGatewayResponse):
    def __init__(self, message, exception, http_code=422):
        self.message = message
        self.exception = exception
        data = self.build_data()

        super().__init__(data=data, http_code=http_code)

    def build_data(self):
        return {
            'exception': self.exception,
            'message': self.message,
        }
