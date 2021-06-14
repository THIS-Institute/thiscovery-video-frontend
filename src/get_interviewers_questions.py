from interviews.questions import Questions

from api.responses import (
    ApiGatewayResponse,
    ApiGatewayErrorResponse,
    ResponseException,
)

def lambda_handler(event, context):
    try:
        survey_id = event['pathParameters']['taskId']
    except KeyError:
        return ApiGatewayErrorResponse(
            exception=ResponseException.EXCEPTION_MISSING_PARAM,
            message='survey id in path is required',
        ).response()

    thiscovery_questions = Questions(survey_id)

    survey = thiscovery_questions.get_task_survey()
    questions  = thiscovery_questions.format_as_interviewers(survey)

    response = {
        'questions': questions,
    }

    return ApiGatewayResponse(data=response).response()
