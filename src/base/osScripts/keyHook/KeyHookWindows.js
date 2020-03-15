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

	parseScriptOutput(line) {
		let [keyCode, action] = line.split(' ');
		return [{keyCode, isDown: action === '256' || action === '260'}];
	}
}

module.exports = KeyHookWindows;
