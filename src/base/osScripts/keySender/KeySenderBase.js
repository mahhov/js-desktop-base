const ScriptBase = require('../ScriptBase');

// SHARED BY LINUX & WINDOWS
class KeySenderBase extends ScriptBase {
	RELEASE = -1;
	PRESS = -2;
	TYPE = -3;
	COMBO = -4;

	constructor() {
		super();
		this.keyMap = this.createKeyMap();
	}

	createKeyMap() {
		/* override */
	}

	stringToKeys(string) {
		return string
			.match(/[^{}]|{\w+}/g)
			.map(c => c.toUpperCase())
			.map(c => this.keyMap[c])
			.filter(a => a);
	}

	string(action, string) {
		this.send([action, ...this.stringToKeys(string)]);
	}

	// KeySender.strings(
	// 	 [KeySender.RELEASE, '{control}{shift}x'],
	// 	 [KeySender.COMBO, '{control}c']);
	strings(...actionStringPairs) {
		this.send(actionStringPairs
			.reduce((prev, [action, string]) =>
				[...prev, action, ...this.stringToKeys(string)], []));
	}
}

module.exports = KeySenderBase;

// todo extract duplicate code with frontWindowTitle to powerShellExecutor
