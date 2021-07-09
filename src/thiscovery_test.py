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

def user_interview_tasks(event, context):
    response_id = event['pathParameters']['id']

    return ApiGatewayResponse(data={
        'anon_project_specific_user_id': '7e6e4bca-4f0b-4f71-8660-790c1baf3b11',
        'anon_user_task_id': 'testdce9-9745-46cc-8db0-3e8de47c463b',
        'interview_task_id': 'test6eff-b1e5-44df-93b4-3d71c03adeff',
        'interview_task': EXAMPLE_TASK,
        'event_time': '2021-01-01 00:00:00.000000',
        'response_id': response_id
    }).response()

def interview_tasks(event, context):
    return ApiGatewayResponse(data=EXAMPLE_TASK).response()

def interview_questions(event, context):
    survey_id = event['pathParameters']['id']

    return ApiGatewayResponse(data={
        "survey_id": survey_id,
        "modified": "2021-06-14T10:16:25Z",
        "blocks": [
            {
                "block_id": "BL_eQESIsA5b3xfWn3",
                "block_name": "Introductory questions",
                "questions": [
                    {
                        "question_id": "QID1",
                        "question_name": "Q1",
                        "sequence_no": "1",
                        "question_text": "<h3>How are you this morning?</h3>",
                        "question_description": "<p>Please take a minute to reflect on how you feel and/or things you are grateful for this morning.</p>"
                    },
                    {
                        "question_id": "QID2",
                        "question_name": "Q2",
                        "sequence_no": "2",
                        "question_text": "<h3>What are you planning to do this afternoon?</h3>",
                        "question_description": "<p>Are you planning to bake cakes? Going on a bike ride? Maybe going on a bike ride and then eating cake? Whatever your plans are, please don't be shy to share.</p>"
                    }
                ]
            },
            {
                "block_id": "BL_3qH1dnbq50y9V0a",
                "block_name": "Your experience using thiscovery",
                "questions": [
                    {
                        "question_id": "QID3",
                        "question_name": "Q3",
                        "sequence_no": "3",
                        "question_text": "<h3>How many thiscovery tasks have you completed to date?</h3>",
                        "question_description": None
                    },
                    {
                        "question_id": "QID4",
                        "question_name": "Q4",
                        "sequence_no": "4",
                        "question_text": "<h3>Would you recommend thiscovery to a friend?</h3>",
                        "question_description": "<p>If you enjoyed using thiscovery, why not spread the word?</p>"
                    },
                    {
                        "question_id": "QID5",
                        "question_name": "Q5",
                        "sequence_no": "5",
                        "question_text": "<a href=\"https://player.vimeo.com/video/403648880\" target=\"_blank\">Please watch this video</a>",
                        "question_description": "<p>Please take a minute to reflect on how you feel and/or things you are grateful for this morning.</p>"
                    },
                ]
            }
        ],
        "count": 4
    }).response()
