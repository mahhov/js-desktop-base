const ScriptBase = require('../ScriptBase');
const {codes} = require('../keyCodes/keyCodes');

// SHARED BY LINUX & WINDOWS
class KeySenderBase extends ScriptBase {
	constructor() {
		super();
		this.keyStates = {};
		this.shortcuts = [];

		this.addListener(({out}) => {
			let parsed = this.parseScriptOutput(out);
			if (parsed)
				this.onKey(this.mapKeyCodeToString(parsed.keyCode), parsed.isDown);
		});
	}

	parseScriptOutput(line) {
		/* override */
		// return {keyCode, isDown};
	}

	mapKeyCodeToString(code) {
		return codes[code];
	}

	onKey(key, down) {
		let repeat = this.keyStates[key];
		this.keyStates[key] = down;
		if (down && !repeat)
			this.shortcuts
				.filter(({keys}) => keys.every(key => this.keyStates[key]))
				.filter(({lastKey}) => lastKey.some(keyI => keyI === key))
				.forEach(shortcut => shortcut.handler());
	}

	// keys is an array of keys that must all be down.
	// lastKey is an array of keys, one of which must be the last key to be pressed. The remaining lastKeys need not be pressed, unless also included in keys.
	addShortcut(keys, lastKey, handler) {
		this.shortcuts.push({keys, lastKey, handler});
	}
}

module.exports = KeySenderBase;
