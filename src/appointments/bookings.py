import os
import uuid
from .exceptions import BookingError, InvalidTimeslot, AppointmentNotFound
from .acuity import AcuityError
from dynamodb import DynamoDB
from events import Event, EventBridge
from requests import Response
from postmarker.core import PostmarkClient

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

        anon_user_id = user['anonUserId']
        anon_user_task_id = user['anonUserTaskId']
        task_id = user['taskId']
        interview_id = str(uuid.uuid4())
        appointment_id = str(appointment['id'])
        appointment_time = str(appointment['datetime'])

        self.db.put_item(
            Item={
                'pk': f'USER#{anon_user_id}',
                'sk': f'TASK#{task_id}',
                'appointment_id': appointment_id,
                'appointment_time': appointment_time,
                'interview_id': interview_id,
                'track': 'live',
            }
        )

        self.db.put_item(
            Item={
                'pk': f'APPOINTMENT#{appointment_id}',
                'sk': 'INFO',
                'user': f'USER#{anon_user_id}',
                'user_id': anon_user_id,
                'task': f'TASK#{task_id}',
                'task_id': task_id,
                'interview_id': interview_id,
                'anon_user_task_id': anon_user_task_id,
                'appointment_id': appointment_id,
                'appointment_time': appointment_time,
            }
        )

        self.create_event(
            event_type='interview_booked',
            appointment=appointment,
            interview_id=interview_id,
            anon_user_id=anon_user_id,
            anon_user_task_id=anon_user_task_id,
        )

        base_url = os.environ['APP_BASE_URL']
        first_name = user['firstName']
        
        html_body = f"""
        <html>
            <body>
                <p><b>Hello {first_name},</b></p>
                <p>This is a test email, that provides interview room links to support testing.</p>
                <p style="margin-bottom: 20px">(If testing both links yourself, don't open them both in the same browser session).</p>
                <p><b>Interviewee's link:</b> {base_url}/live/{appointment_id}</p>
                <p><b>Interviewer's link:</b> {base_url}/live/{appointment_id}?isInterviewer</p>
            </body>
        </html>
        """

        postmark = PostmarkClient(server_token=os.environ['POSTMARK_TOKEN'])
        postmark.emails.send(
            From='thiscovery@engageinteractive.co.uk',
            To=user['email'],
            Subject='Your Thiscovery Remote Interview',
            HtmlBody=html_body,
        )

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

        item = appointment_info['Item']

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
            Key={ 'pk': item['user'], 'sk': item['task'] },
            UpdateExpression='SET appointment_time = :t',
            ExpressionAttributeValues={
                ':t': appointment_time,
            },
        )

        self.create_event(
            event_type='interview_rescheduled',
            appointment=appointment,
            interview_id=item['interview_id'],
            anon_user_id=item['user_id'],
            anon_user_task_id=item['anon_user_task_id'],
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

        item = appointment_info['Item']

        self.db.update_item(
            Key={ 'pk': item['user'], 'sk': item['task'] },
            UpdateExpression='REMOVE appointment_id, appointment_time',
        )

        self.db.delete_item(Key={
            'pk': f'APPOINTMENT#{appointment_id}',
            'sk': 'INFO',
        })

        self.create_event(
            event_type='interview_cancelled',
            appointment=cancellation,
            interview_id=item['interview_id'],
            anon_user_id=item['user_id'],
            anon_user_task_id=item['anon_user_task_id'],
        )

        return cancellation

    def create_event(self, event_type, appointment, interview_id, anon_user_id, anon_user_task_id):
        appointment_id = str(appointment['id'])
        app_base_url = os.environ['APP_BASE_URL']
    
        event = Event(
            source='thiscovery_video',
            detail_type=event_type,
            detail={
                'interview_id': interview_id,
                'anon_project_specific_user_id': anon_user_id,
                'anon_user_task_id': anon_user_task_id,
                'appointment_datetime': appointment['datetime'],
                'calendar_name': appointment['calendar'],
                'calendar_id': appointment['calendarID'],
                'appointment_type': appointment['type'],
                'appointment_type_id': appointment['appointmentTypeID'],
                'appointment_id': appointment['id'],
                'appointment_duration': appointment['duration'],
                'appointment_timezone': appointment['timezone'],
                'interview_room_url': f'{app_base_url}/live/{appointment_id}',
            },
        )

        self.event_bridge.put_event(event)
