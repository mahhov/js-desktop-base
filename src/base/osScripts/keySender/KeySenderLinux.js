// LINUX ONLY

const path = require('path');
const {spawn} = require("child_process");
const KeySenderBase = require('./KeySenderBase');

class KeySenderLinux extends KeySenderBase {
	spawnProcess() {
		return spawn(path.join(__dirname, './keySender.sh'));
	}

	async send(arg) {
		super.send(arg.join(' ')); // todo can we get a single send method that works for both linux and windows?
	}
}

module.exports = KeySenderLinux;
