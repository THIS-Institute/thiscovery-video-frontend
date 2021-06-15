from interviews.questions import Questions
from thiscovery.task import TaskService

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    try:
        task_id = event['pathParameters']['taskId']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='survey id in path is required',
        ).response()

    thiscovery_tasks = TaskService()
    task = thiscovery_tasks.get(task_id)

    thiscovery_questions = Questions(task['on_demand_survey_id'])

    survey = thiscovery_questions.get_task_survey()
    questions  = thiscovery_questions.format_as_self_record(survey)

    response = {
        'blocks': questions,
    }

    return ApiGatewayResponse(data=response).response()
