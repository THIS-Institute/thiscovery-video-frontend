from api.responses import ApiGatewayResponse

EXAMPLE_TASK = {
    'appointment_type_id': '20973054',
    'description': 'Learning from intensive caffeine experiences',
    'live_survey_id': 'SV_00000000',
    'completion_url': 'https://staging.thiscovery.org/video-return/',
    'interview_task_id': 'test6eff-b1e5-44df-93b4-3d71c03adeff',
    'on_demand_available': True,
    'name': 'Learning from intensive caffeine experiences',
    'modified': '2021-05-24 11:21:42.778018+01:00',
    'short_name': 'Intensive caffeine experiences',
    'on_demand_survey_id': None,
    'live_available': True,
    'project_task_id': 'testtec46a-bc1b-4f3d-ad0f-0b8d0826a908'
}

def user_interview_tasks(event):
    response_id = event['pathParameters']['id']

    return ApiGatewayResponse(data={
        'anon_project_specific_user_id': '7e6e4bca-4f0b-4f71-8660-790c1baf3b11',
        'anon_user_task_id': 'testdce9-9745-46cc-8db0-3e8de47c463b',
        'interview_task_id': 'test6eff-b1e5-44df-93b4-3d71c03adeff',
        'interview_task': EXAMPLE_TASK,
        'event_time': '2021-01-01 00:00:00.000000',
        'response_id': response_id
    }).response()

def interview_tasks(event):
    return ApiGatewayResponse(data=EXAMPLE_TASK).response()
