import { client } from './backend';

export async function getTask (key) {
	const response = await client.get(`task/${key}`)
		.then((response) => response)
		.catch((error) => console.error(error));

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