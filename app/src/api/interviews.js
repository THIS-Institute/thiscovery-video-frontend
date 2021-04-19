import { client } from './backend';

export async function creatInterviewAnswer (data) {
	const response = await client.post(`self-record-interview/answer`, data)
		.then((response) => response)
		.catch((error) => console.error(error));

	return response;
}

export async function putAnswerVideo (presignedUrl, blob) {
    const data = new FormData();

    data.append('file', blob);

	const response = await fetch(presignedUrl, {
		method: 'PUT',
		body: data,
	});

	return response.json();
}
