class XPromise {
	constructor(promise = undefined) {
		let resolve, reject;
		let xPromise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});
		xPromise.resolve = resolve;
		xPromise.reject = reject;

		xPromise.success = false;
		xPromise.error = false;
		xPromise.done = false;
		xPromise.then((...args) => {
			xPromise.success = true;
			xPromise.successArgs = args;
		});
		xPromise.catch((...args) => {
			xPromise.error = true;
			xPromise.errorArgs = args;
		});
		xPromise.finally(() => {
			xPromise.done = true;
		});

		promise?.then(resolve);
		promise?.catch(reject);

		return xPromise;
	}
}

module.exports = XPromise;
