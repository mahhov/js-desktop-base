const https = require('https');
const querystring = require('querystring');

/*
	{
		response {},
		body [],
		error [],
		string '',
	}
*/
let handleResponse = response =>
	new Promise((resolve, reject) => {
		let ret = {response, body: [], errors: []};
		response.on('data', chunk => ret.body.push(chunk));
		response.on('end', () => {
			try {
				ret.string = Buffer.concat(ret.body).toString();
			} catch (e) {
				ret.errors.push('failed to parse body');
				ret.errors.push(e);
				reject(ret);
			}
			if (response.statusCode < 200 || response.statusCode >= 300) {
				ret.errors.push('bad status code');
				ret.errors.push(response.statusCode);
				reject(ret);
			} else
				resolve(ret);
		});
	});

let get = (endpoint, queryParams = {}, headers = {}) =>
	new Promise((resolve, reject) => {
		let queryParamsString = querystring.stringify(queryParams);
		let endpointWithParams = queryParamsString ? `${endpoint}?${queryParamsString}` : endpoint;
		https.get(endpointWithParams, {headers},
			response => handleResponse(response)
				.then(resolve)
				.catch(reject))
			.on('error', reject);
	});

let post = (endpoint, body, headers = {}) =>
	new Promise((resolve, reject) => {
		let reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': JSON.stringify(body).length,
				...headers,
			},
		};
		let req = https.request(endpoint, reqOptions,
			response => handleResponse(response)
				.then(resolve)
				.catch(reject));
		req.on('error', reject);
		req.write(JSON.stringify(body));
		req.end();
	});

let post2 = (endpoint, queryParams = {}, body = {}, headers = {}) =>
	new Promise((resolve, reject) => {
		let queryParamsString = querystring.stringify(queryParams);
		let endpointWithParams = queryParamsString ? `${endpoint}?${queryParamsString}` : endpoint;
		let reqOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': JSON.stringify(body).length,
				...headers,
			},
		};
		let req = https.request(endpointWithParams, reqOptions,
			response => handleResponse(response)
				.then(resolve)
				.catch(reject));
		req.on('error', reject);
		req.write(JSON.stringify(body));
		req.end();
	});

module.exports = {get, post, post2};
