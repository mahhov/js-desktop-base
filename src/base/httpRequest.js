const https = require('https');
const querystring = require('querystring');

let handleResponse = response =>
	new Promise((resolve, reject) => {
		let body = [];
		response.on('data', chunk => body.push(chunk));
		response.on('end', () => {
			let parsed;
			try {
				parsed = Buffer.concat(body).toString();
			} catch (e) {
				reject('failed to parse', body, e);
			}
			if (response.statusCode < 200 || response.statusCode >= 300)
				reject(parsed);
			else
				resolve(parsed);
		});
	});

let get = (endpoint, queryParams = {}) =>
	new Promise((resolve, reject) => {
		let queryParamsString = querystring.stringify(queryParams);
		let endpointWithParams = queryParamsString ? `${endpoint}?${queryParamsString}` : endpoint;
		https.get(endpointWithParams,
			response => handleResponse(response)
				.then(resolve)
				.catch(reject))
			.on('error', reject);
	});

let post = (endpoint, data) =>
	new Promise((resolve, reject) => {
		let reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': JSON.stringify(data).length,
			},
		};
		let req = https.request(endpoint, reqOptions,
			response => handleResponse(response)
				.then(resolve)
				.catch(reject));
		req.on('error', reject);
		req.write(JSON.stringify(data));
		req.end();
	});

module.exports = {get, post};
