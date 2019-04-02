const ScriptBase = require('../ScriptBase');

// SHARED BY LINUX & WINDOWS
class KeySenderBase extends ScriptBase {
	constructor() {
		super();
		this.keyStates = {};
		this.shortcuts = [];

		this.addListener(({out}) => {
			if (!out)
				return;
			let [key, action] = out.split(' ');
			key = this.keyMap(key);
			action = this.isActionDown(action);
			if (key && action)
				this.onKey(key, action);
		});
	}

	keyMap(key) {
		/* override */
	}

	isActionDown(action) {
		/* override */
	}

	onKey(key, down) {
		let repeat = this.keyStates[code];
		this.keyStates[code] = down;
		if (down && !repeat)
			this.shortcuts
				.filter(({keys}) => keys.every(key => this.keyStates[key]))
				.filter(({lastKey}) => lastKey.some(key => key === code))
				.forEach(shortcut => shortcut.handler());
	}

	// keys is an array of keys that must all be down.
	// lastKey is an array of keys, one of which must be the last key to be pressed. The remaining lastKeys need not be pressed, unless also included in keys.
	addShortcut(keys, lastKey, handler) {
		this.shortcuts.push({keys, lastKey, handler});
	}
}

module.exports = KeySenderBase;
