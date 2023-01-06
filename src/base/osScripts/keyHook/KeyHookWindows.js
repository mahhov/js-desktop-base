// WINDOWS ONLY

const fs = require('fs').promises;
const path = require('path');
const {spawn} = require("child_process");
const KeyHookBase = require('./KeyHookBase');

class KeyHookWindows extends KeyHookBase {
	async spawnProcess() {
		let file = path.join(__dirname, './keyHook.ps1');
		return spawn('powershell.exe', ['-executionpolicy', 'bypass', '-File', file], {shell: true});
	}

	parseScriptOutput(out) {
		return out
			.trim()
			.split('\n')
			.map(line => {
				let [keyCode, action] = line.split(' ');
				return {keyCode: Number(keyCode), isDown: action === '256' || action === '260'};
			});
	}
}

module.exports = KeyHookWindows;
