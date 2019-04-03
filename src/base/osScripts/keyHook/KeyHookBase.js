const ScriptBase = require('../ScriptBase');
const keyCodes = require('../keyCodes/keyCodes');

// SHARED BY LINUX & WINDOWS
class KeySenderBase extends ScriptBase {
	constructor() {
		super();
		this.keyStates = {};
		this.shortcuts = [];

		this.addListener(({out}) => {
			if (!out)
				return;
			let parsed = this.parseScriptOutput(out);
			if (parsed)
				this.onKey(keyCodes.codeToString(parsed.keyCode), parsed.isDown);
		});
	}

	parseScriptOutput(line) {
		/* override */
		// return {keyCode, isDown};
	}

	onKey(key, isDown) {
		let repeat = this.keyStates[key];
		this.keyStates[key] = isDown;
		if (isDown && !repeat)
			this.shortcuts
				.filter(({keys}) => keys.every(key => this.keyStates[key]))
				.filter(({lastKeys}) => lastKeys.some(keyI => keyI === key))
				.forEach(shortcut => shortcut.handler());
	}

	// keys is a string of of keys that must all be down.
	// lastKeys is a string of keys, one of which must be the last key to be pressed. The remaining lastKeys need not be pressed, unless also included in keys.
	addShortcut(keys, lastKeys, handler) {
		keys = keyCodes.stringToArray(keys);
		lastKeys = keyCodes.stringToArray(lastKeys);
		this.shortcuts.push({keys, lastKeys, handler});
	}
}

module.exports = KeySenderBase;
