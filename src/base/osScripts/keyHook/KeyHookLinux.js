// LINUX ONLY
const path = require('path');
const {spawn} = require("child_process");
const KeyHookBase = require('./KeyHookBase');

class KeyHookLinux extends KeyHookBase {
	spawnProcess() {
		return spawn(path.join(__dirname, './keyHook.sh'));
	}

	parseScriptOutput(line) {
		return line
			.trim()
			.split(/\n/)
			.map(l => {
				let [_, action, keyCode] = l.split(/\s+/);
				return {keyCode, isDown: action === 'press'};
			});
	}
}

module.exports = KeyHookLinux;
