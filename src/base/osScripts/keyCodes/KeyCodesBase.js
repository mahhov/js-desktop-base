class KeyCodeBase {
	constructor() {
		this.codes = this.getCodes();
		this.addCodeAliases();
	}

	getCodes() {
		/* override */
	}

	addCodeAliases() {
		[
			[' ', 'SPACE'],
			['RETURN', 'ENTER'],
			['CTRL', 'CONTROL'],
			['L_CTRL', 'L_CONTROL'],
			['R_CTRL', 'R_CONTROL'],
			['ESC', 'ESCAPE'],
			[',', 'COMMA'],
			[';', 'SEMICOLON'],
			['.', 'PERIOD'],
			['-', 'DASH'],
			['=', 'EQUALS'],
			['\'', 'QUOTE'],
			['`', 'GRAVE'],
			['[', 'L_BRACKET'],
			[']', 'R_BRACKET'],
			['/', 'SLASH'],
			['\\', 'BACKSLASH'],
		].forEach(([alias, code]) => this.codes[alias] = this.codes[code]);
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
			.map(k => this.keyToCodes(k)[0]);
	}

	// converts a single key to all its codes
	// e.g. 'CTRL' -> [17, 162, 163]
	keyToCodes(key) {
		return this.codes[key];
	}

	// converts a code to a key
	// e.g. 65 -> A
	codeToKey(code) {
		return Object.entries(this.codes).find(([_, c]) => c === code)?.[0];
	}
}

module.exports = KeyCodeBase;

// -terminology-
// string: '{Ctrl}a'
// codes: [100, 34]
// key: 'L_CTRL'
