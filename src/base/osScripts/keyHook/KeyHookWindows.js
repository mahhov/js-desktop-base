// WINDOWS ONLY
const fs = require('fs').promises;
const path = require('path');
const {spawn} = require("child_process");
const KeyHookBase = require('./KeyHookBase');

class KeyHookWindows extends KeyHookBase {
	async spawnProcess() {
		let script = fs.readFile(path.join(__dirname, './keyHook.ps1'))
			.catch(e => console.log('unable to read key sender powershell script:', e));
		return spawn((await script).toString(), [], {shell: "powershell"});
	}

	keyMap(key) {
		console.log('key', key)
		/* override */
	}

	isActionDown(action) {
		return action === 256;
	}
}

module.exports = KeyHookWindows;