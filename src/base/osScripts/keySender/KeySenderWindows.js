// WINDOWS ONLY

const fs = require('fs').promises;
const path = require('path');
const {spawn} = require("child_process");
const KeySenderBase = require('./KeySenderBase');

class KeySenderWindows extends KeySenderBase {
	async spawnProcess() {
		let file = path.join(__dirname, './keySender.ps1');
		return spawn('powershell.exe', ['-executionpolicy', 'bypass', '-File', file], {shell: true});
	}
}

module.exports = KeySenderWindows;
