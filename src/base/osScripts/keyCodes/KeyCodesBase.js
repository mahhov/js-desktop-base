class KeyCodeBase {
	constructor() {
		this.codes = this.getCodes();
	}

	getCodes() {
		/* override */
	}

	// converts a multi key string to a multi key array
	// e.g. '{Ctrl}a' -> ['CTRL', 'A']
	stringToKeys(string) {
		return (string
			.match(/[^{}]|{\w+}/g) || [])
			.map(s => s.match(/{?([^{}]*)/)[1])
			.map(s => s.toUpperCase())
			.filter(k => this.codes[k]);
	}

	// converts a multi key string to a code sequence
	// e.g. '{Ctrl}a' -> [16, 65]
	stringToCodes(string) {
		return this.stringToKeys(string)
			.map(k => this.codes[k])
			.map(c => this.keyToCodes(c))
			.map(cs => cs[0]);
	}

	// converts a single key to all its codes
	// e.g. 'CTRL' -> [17, 162, 163]
	keyToCodes(string) {
		return [this.codes[string]].flat();
	}
}

module.exports = KeyCodeBase;

// -terminology-
// string: '{Ctrl}a'
// codes: [100, 34]
// key: 'L_CTRL'
