from io import StringIO
from html.parser import HTMLParser
from thiscovery.questions import QuestionsService

class HTMLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.text = StringIO()

    def handle_data(self, data):
        self.text.write(data)

    def get(self):
        return self.text.getvalue()

def strip_html_tags(html):
    stripper = HTMLStripper()
    stripper.feed(html)
    return stripper.get()

class Questions():
    def __init__(self, task_id):
        self.task_id = task_id

    def get_task_survey(self):
        service = QuestionsService()
        survey = service.get(self.task_id)

        return survey

    def format_as_interviewers(self, survey):
        interviewer_questions = []

        if 'blocks' in survey:
            for block in survey['blocks']:
                if 'questions' in block:
                    for question in block['questions']:
                        interviewer_questions.append({
                            'name': question['question_name'],
                            'title': strip_html_tags(question['question_text']),
                        })
        
        return interviewer_questions

    def format_as_self_record(self, survey):
        self_record_blocks = []

        if 'blocks' in survey:
            for block in survey['blocks']:
                self_record_blocks.append({
                    'id': block['block_id'],
                    'title': block['block_name'],
                    'questions': self.self_record_questions(block['questions']),
                })

        return self_record_blocks

    def self_record_questions(self, questions):
        interview_questions = []

        for question in questions:
            if question['question_description']:
                description = strip_html_tags(question['question_description'])
            else:
                description = None

            interview_questions.append({
                'id': question['question_id'],
                'name': question['question_name'],
                'sequence': question['sequence_no'],
                'title': strip_html_tags(question['question_text']),
                'description': description,
            })

        return interview_questions
