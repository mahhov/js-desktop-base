// LINUX ONLY
const KeySenderBase = require('./KeySenderBase'); // todo reorder requires
const path = require('path');
const {spawn} = require("child_process");

class KeySenderLinux extends KeySenderBase {
	spawnProcess() {
		return spawn(path.join(__dirname, './keySender.sh'));
	}

	async send(arg) {
		super.send(arg.join(' ')); // todo can we get a single send method that works for both linux and windows?
	}
}

module.exports = KeySenderLinux;
