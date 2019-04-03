// LINUX ONLY
const path = require('path');
const {spawn} = require("child_process");
const KeyHookBase = require('./KeyHookBase');

class KeyHookLinux extends KeyHookBase {
	spawnProcess() {
		return spawn(path.join(__dirname, './keyHook.sh'));
	}

	parseScriptOutput(line) {
		let [_, action, keyCode] = line.split(/\s+/);
		return {keyCode, isDown: action === 'press'};
	}
}

module.exports = KeyHookLinux;
