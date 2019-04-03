const ScriptBase = require('../ScriptBase');
const keyCodes = require('../keyCodes/keyCodes');

// SHARED BY LINUX & WINDOWS
class KeySenderBase extends ScriptBase {
	constructor() {
		super();
		this.RELEASE = -1;
		this.PRESS = -2;
		this.TYPE = -3;
		this.COMBO = -4;
	}

	string(action, string) {
		this.send([action, ...keyCodes.stringToCodes(string)]);
	}

	// KeySender.strings(
	// 	 [KeySender.RELEASE, '{control}{shift}x'],
	// 	 [KeySender.COMBO, '{control}c']);
	strings(...actionStringPairs) {
		this.send(actionStringPairs
			.reduce((prev, [action, string]) =>
				[...prev, action, ...keyCodes.stringToCodes(string)], []));
	}
}

module.exports = KeySenderBase;
