import env from '@/app.env';

const BackendClient = function (options = {}) {
	this.VERSION = 'v1';

	const defaults = {
		apiKey: '',
		baseUrl: '',
	};

	const configuration = Object.assign(defaults, options);

	this.apiKey = configuration.apiKey;
	this.baseUrl = configuration.baseUrl;
  
	return this;
}

BackendClient.prototype.get = async function (endpoint, requestOptions = {}) {
	const options = Object.assign({
		method: 'GET',
	}, requestOptions);

	return await this._request(endpoint, options);
}

BackendClient.prototype.post = async function (endpoint, data, requestOptions = {}) {
	const options = Object.assign({
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}, requestOptions);

	return await this._request(endpoint, options);
}

BackendClient.prototype.postRaw = async function (endpoint, data, requestOptions = {}) {
	const options = Object.assign({
		method: 'POST',
		body: data,
	}, requestOptions);

	return await this._request(endpoint, options);
}

BackendClient.prototype.patch = async function (endpoint, data = {}, requestOptions = {}) {
	const options = Object.assign({
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}, requestOptions);

	return await this._request(endpoint, options);
}

BackendClient.prototype.delete = async function (endpoint, requestOptions = {}) {
	const options = Object.assign({
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	}, requestOptions);

	return await this._request(endpoint, options);
}

BackendClient.prototype._request = async function (endpoint, options = {}) {
	const url = `${this.baseUrl}/${this.VERSION}/${endpoint}`;
	
	const response = await fetch(url, options);

	return response.json();
}

export const client = new BackendClient({
	baseUrl: env.backendApiHost,
});
