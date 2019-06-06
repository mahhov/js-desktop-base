const ScriptBase = require('../ScriptBase');
const keyCodes = require('../keyCodes/keyCodes');

// SHARED BY LINUX & WINDOWS
class KeyHookBase extends ScriptBase {
	constructor() {
		super();
		this.keyStates = {};
		this.shortcuts = [];

		this.addListener(({out, err}) => {
			if (err)
				console.error('Error from keyHook script:', err);
			if (!out)
				return;
			let parsed = this.parseScriptOutput(out);
			if (parsed)
				this.onKey(parsed.keyCode, parsed.isDown);
		});
	}

	parseScriptOutput(line) {
		/* override */
		// return {keyCode, isDown};
	}

	onKey(keyCode, isDown) {
		let repeat = this.keyStates[keyCode];
		this.keyStates[keyCode] = isDown;

		if (isDown && !repeat)
			this.shortcuts
				.filter(({keys}) => keys
					.every(key => keyCodes.keyToCodes(key)
						.some(code => this.keyStates[code])))
				.filter(({lastKeys}) => lastKeys
					.some(key => keyCodes.keyToCodes(key)
						.some(code => code === keyCode)))
				.forEach(shortcut => shortcut.handler());
	}

	// keys is a key string that must all be down.
	// lastKeys is a key string, one of which must be the last key pressed. The remaining lastKeys need not be pressed, unless also included in keys.
	// e.g. keys = '{ctrl}{l_shift}' and lastKeys = 'ab' will activate when a or b are pressed if any ctrl key is already pressed and the left shift key is already pressed.
	addShortcut(keys, lastKeys, handler) {
		keys = keyCodes.stringToKeys(keys);
		lastKeys = keyCodes.stringToKeys(lastKeys);
		this.shortcuts.push({keys, lastKeys, handler});
	}
}

module.exports = KeyHookBase;
