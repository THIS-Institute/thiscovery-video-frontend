import { client } from './backend';

export async function fetchRoomToken (options) {
	const response = await client.post(`room/token`, options);

	if (response.access_token) {
		return response.access_token;
	}

	return response;
}

export async function creatInterviewAnswer (data) {
	const response = await client.post(`self-record-interview/answer`, data)
		.then((response) => response)
		.catch((error) => console.error(error));

	return response;
}

export async function putAnswerVideo (presignedUrl, blob) {
	const response = await fetch(presignedUrl, {
		method: 'PUT',
		body: blob,
	});

	return response;
}

export async function createSelfRecord (options) {
	const response = await client.post(`start-self-record`, {
		...options,
	})

	return response;
}

export async function saveInterview (id, options) {
	const response = await client.post(`save-interview/${id}`, {
		...options,
	})
 
	return response;
}

export async function linkInterviewRoom (options) {
	const response = await client.post(`room/link`, {
		...options,
	})

	return response;
}
