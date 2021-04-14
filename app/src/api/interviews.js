import { client } from './backend';

export async function creatInterviewAnswer (data) {
	const response = await client.post(`self-record-interview/answer`, data)
		.then((response) => response)
		.catch((error) => console.error(error));

	return response;
}

export async function uploadInterviewAnswerVideo (blob) {
    const formData = new FormData();

    formData.append('video', blob);

	const response = await client.postRaw(
            `self-record-interview/upload-video`,
            formData,
        )
		.then((response) => response)
		.catch((error) => console.error(error));

	return response;
}
