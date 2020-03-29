const https = require('https');
const querystring = require('querystring');

let get = (endpoint, queryParams = {}) =>
	new Promise((resolve, reject) => {
		let queryParamsString = querystring.stringify(queryParams);
		https.get(queryParamsString ? `${endpoint}?${queryParamsString}` : endpoint, res => {
			if (res.statusCode < 200 || res.statusCode >= 300)
				reject(res);
			let body = [];
			res.on('data', chunk => body.push(chunk));
			res.on('end', () => {
				try {
					resolve(Buffer.concat(body).toString());
				} catch (e) {
					reject(e);
				}
			});
		}).on('error', reject);
	});

let post = (endpoint, data) =>
	new Promise((resolve, reject) => {
		let req = https.request(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': JSON.stringify(data).length,
			},
		}, res => {
			if (res.statusCode < 200 || res.statusCode >= 300)
				reject(res.statusCode);
			let body = [];
			res.on('data', chunk => body.push(chunk));
			res.on('end', () => {
				try {
					resolve(Buffer.concat(body).toString());
				} catch (e) {
					reject('failed to parse', e);
				}
			});
		});
		req.on('error', reject);
		req.write(JSON.stringify(data));
		req.end();
	});

module.exports = {get, post};
