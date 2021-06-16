import { client } from './backend';

const DELAY_TIME = 1500;
const MAX_RETRIES = 3;

const wait = async () => {
	return new Promise((resolve) => setTimeout(resolve, DELAY_TIME));
}

export async function getTask (options) {
	const onFetchError = async (error) => {
		if ('tries' in options) {
			if (options.tries < 1) {
				throw error;
			}

			options.tries = options.tries - 1;
		} else {
			options.tries = MAX_RETRIES - 1;
		}

		return wait(DELAY_TIME).then(() => getTask(options));
	};

	const response = await client.post(`task/${options.responseId}`, {
			userId: options.userId,
		})
		.catch(onFetchError);

	return response;
}

export async function getSelfRecordQuestions (taskId) {
	const response = await client.get(`self-record-questions/${taskId}`)
		.then((response) => response)
		.catch((error) => console.error(error));

	return response;
}

export async function getInterviewersQuestions (taskId) {
	const response = await client.get(`interviewers-questions/${taskId}`)
		.then((response) => response)
		.catch((error) => console.error(error));

	return response;
}
