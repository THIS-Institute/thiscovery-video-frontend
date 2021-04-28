import os
from appointments.acuity import Acuity, AcuityAuth
from secrets import SecretsManager

class AcuityClientFactory:
    @staticmethod
    def create_client():
        secret = SecretsManager(os.environ['SECRETS_NAMESPACE'])

        auth = AcuityAuth(
            uid=secret.get('acuity-uid'),
            api_key=secret.get('acuity-api-key')
        )

        return Acuity(auth=auth)
