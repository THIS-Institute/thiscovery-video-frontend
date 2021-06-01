import os
from .exceptions import BookingError, InvalidTimeslot, AppointmentNotFound
from .acuity import AcuityError
from dynamodb import DynamoDB
from events import Event, EventBridge
from requests import Response

class Bookings:
    def __init__(self, acuity_client):
        self.acuity = acuity_client
        self.db = DynamoDB().client()
        self.event_bridge = EventBridge()

    def create(self, appointment_type_id, appointment_time, user):
        time_string = appointment_time.strftime('%Y-%m-%dT%H:%M:%S%z')

        availability = self.acuity.check_availability(
            appointment_type_id=appointment_type_id,
            appointment_time=time_string,
        )
    
        if not availability['valid']:
            raise InvalidTimeslot

        appointment = self.acuity.create_appointment(
            appointment_time=time_string,
            appointment_type_id=appointment_type_id,
            email=user['email'],
            first_name=user['firstName'],
            last_name=user['lastName'],
        )

        if 'id' not in appointment:
            raise BookingError

        user_id = user['userId']
        task_id = user['taskId']
        appointment_id = str(appointment['id'])
        appointment_time = str(appointment['datetime'])
        app_base_url = os.environ['APP_BASE_URL']

        self.db.put_item(
            Item={
                'pk': f'USER#{user_id}',
                'sk': f'TASK#{task_id}',
                'appointment_id': appointment_id,
                'appointment_time': appointment_time,
            }
        )

        self.db.put_item(
            Item={
                'pk': f'APPOINTMENT#{appointment_id}',
                'sk': 'INFO',
                'user': f'USER#{user_id}',
                'task': f'TASK#{task_id}',
                'appointment_id': appointment_id,
                'appointment_time': appointment_time,
            }
        )

        event = Event(
            source='thiscovery_video',
            detail_type= 'interview_booked',
            detail={
                'appointment_datetime': appointment['datetime'],
                'calendar_name': appointment['calendar'],
                'calendar_id': appointment['calendarID'],
                'appointment_type': appointment['type'],
                'appointment_id': appointment['id'],
                'appointment_duration': appointment['duration'],
                'appointment_timezone': appointment['timezone'],
                'interview_room_url': f'{app_base_url}/live/{appointment_id}',
            },
        )

        self.event_bridge.put_event(event)

        return appointment

    def reschedule(self, appointment_id, appointment_type_id, appointment_time):
        time_string = appointment_time.strftime('%Y-%m-%dT%H:%M:%S%z')

        availability = self.acuity.check_availability(
            appointment_type_id=appointment_type_id,
            appointment_time=time_string,
        )
    
        if not availability['valid']:
            raise InvalidTimeslot
        
        appointment = self.acuity.reschedule_appointment(
            appointment_id=appointment_id,
            appointment_time=time_string,
        )

        if isinstance(appointment, Response):
            if appointment.status_code == 404:
                raise AppointmentNotFound
            else:
                raise AcuityError(appointment)

        if 'id' not in appointment:
            raise BookingError
        
        appointment_id = str(appointment['id'])
        appointment_time = str(appointment['datetime'])

        appointment_info = self.db.get_item(Key={
            'pk': f'APPOINTMENT#{appointment_id}',
            'sk': 'INFO',
        })

        user = appointment_info['Item']['user']
        task = appointment_info['Item']['task']

        self.db.update_item(
            Key={
                'pk': f'APPOINTMENT#{appointment_id}',
                'sk': 'INFO',
            },
            UpdateExpression='SET appointment_time = :t',
            ExpressionAttributeValues={
                ':t': appointment_time,
            },
        )

        self.db.update_item(
            Key={ 'pk': user, 'sk': task },
            UpdateExpression='SET appointment_time = :t',
            ExpressionAttributeValues={
                ':t': appointment_time,
            },
        )

        return appointment

    def cancel(self, appointment_id):
        cancellation = self.acuity.cancel_appointment(
            appointment_id=appointment_id,
        )

        if isinstance(cancellation, Response):
            if cancellation.status_code == 404:
                raise AppointmentNotFound
            else:
                raise AcuityError(cancellation)

        appointment_info = self.db.get_item(Key={
            'pk': f'APPOINTMENT#{appointment_id}',
            'sk': 'INFO',
        })

        user = appointment_info['Item']['user']
        task = appointment_info['Item']['task']

        self.db.update_item(
            Key={ 'pk': user, 'sk': task },
            UpdateExpression='REMOVE appointment_id, appointment_time',
        )

        self.db.delete_item(Key={
            'pk': f'APPOINTMENT#{appointment_id}',
            'sk': 'INFO',
        })

        return cancellation
