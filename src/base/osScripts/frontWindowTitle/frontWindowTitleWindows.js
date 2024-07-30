// WINDOWS ONLY

const fs = require('fs').promises;
const path = require('path');
const {spawn} = require("child_process");
const ScriptBase = require('../ScriptBase');
const XPromise = require('../../XPromise');

class FrontWindowTitleWindows extends ScriptBase {
	constructor() {
		super();
		this.addListener(a => this.nextPromise.resolve(a));
	}

	async spawnProcess() {
		let script = fs.readFile(path.join(__dirname, './frontWindowTitle.ps1'))
			.catch(e => console.log('unable to read front window title powershell script:', e));
		return spawn((await script).toString(), [], {shell: "powershell"});
	}

	get() {
		this.nextPromise = new XPromise();
		this.send();
		return this.nextPromise;
	}
}

module.exports = FrontWindowTitleWindows;
