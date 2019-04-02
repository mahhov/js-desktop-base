// WINDOWS ONLY
const KeySenderBase = require('./KeySenderBase');
const fs = require('fs').promises;
const path = require('path');
const {spawn} = require("child_process");

class KeySenderWindows extends KeySenderBase {
	async spawnProcess() {
		let script = fs.readFile(path.join(__dirname, './keySender.ps1'))
			.catch(e => console.log('unable to read key sender powershell script:', e));
		return spawn((await script).toString(), [], {shell: "powershell"});
	}
}

module.exports = KeySenderWindows;
