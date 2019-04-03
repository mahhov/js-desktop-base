class KeyCodeBase {
	constructor() {
		this.codes = this.getCodes();
		this.codeStrings = this.inverseCodes(this.codes);
	}

	getCodes() {
		/* override */
	}

	inverseCodes(codes) {
		let inverse = {};
		Object.entries(codes).forEach(([string, code]) => inverse[code] = string);
		return inverse;
	}

	stringToArray(string) {
		return (string
			.match(/[^{}]|{\w+}/g) || [])
			.map(a => a.match(/{?([^{}]*)/)[1])
			.map(k => k.toUpperCase())
			.filter(k => this.codes[k]);
	}

	stringToCodes(string) {
		return this.stringToArray(string).map(c => this.codes[c]);
	}

	codeToString(code) {
		return this.codeStrings[code];
	}
}

module.exports = KeyCodeBase;
