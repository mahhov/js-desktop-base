const ScriptBase = require('../ScriptBase');
const {codes} = require('../keyCodes/keyCodes');

// SHARED BY LINUX & WINDOWS
class KeySenderBase extends ScriptBase {
	RELEASE = -1;
	PRESS = -2;
	TYPE = -3;
	COMBO = -4;

	stringToKeys(string) {
		return string
			.match(/[^{}]|{\w+}/g)
			.map(a => a.match(/{?([^{}]*)/)[1])
			.map(c => c.toUpperCase())
			.map(c => codes[c])
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
