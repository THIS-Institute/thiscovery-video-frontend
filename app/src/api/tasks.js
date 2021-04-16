import { client } from './backend';

export async function getTask (key) {
	const response = await client.get(`task/${key}`)
		.then((response) => response)
		.catch((error) => console.error(error));

	return response;
}
