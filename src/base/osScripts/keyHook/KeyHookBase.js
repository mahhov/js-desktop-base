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
			this.parseScriptOutput(out)
				.forEach(parsed => this.onKey(parsed.keyCode, parsed.isDown));
		});
	}

	parseScriptOutput(line) {
		/* override */
		// return [{keyCode, isDown}];
	}

	onKey(keyCode, isDown) {
		let repeat = this.keyStates[keyCode];
		this.keyStates[keyCode] = isDown;

		if (isDown && !repeat) {
			let downCodes = Object.entries(this.keyStates)
				.filter(([_, down]) => down)
				.map(([keyCode]) => keyCode);

			this.shortcuts
				.filter(({keys}) => keys
					.every(key => keyCodes.keyToCodes(key)
						.some(code => this.keyStates[code])))
				.filter(({lastKeys}) => lastKeys
					.flatMap(key => keyCodes.keyToCodes(key))
					.includes(keyCode))
				.filter(({keys, lastKeys}) => downCodes
					.every(downCode => [...keys, ...lastKeys]
						.flatMap(key => keyCodes.keyToCodes(key))
						.includes(downCode)))
				.forEach(shortcut => shortcut.handler());
		}
	}

	// keys is a key string that must all be down.
	// lastKeys is a key string, one of which must be the last key pressed. The remaining lastKeys need not be pressed, unless also included in keys.
	// e.g. keys = '{ctrl}{l_shift}' and lastKeys = 'ab' will activate when a or b are pressed if any ctrl key is already pressed and the left shift key is already pressed.
	addShortcut(keys, lastKeys, handler) {
		keys = keyCodes.stringToKeys(keys);
		lastKeys = keyCodes.stringToKeys(lastKeys);
		this.shortcuts.push({keys, lastKeys, handler});
	}

	clearShortcuts() {
		this.shortcuts = [];
	}
}

module.exports = KeyHookBase;
