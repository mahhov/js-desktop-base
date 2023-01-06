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
		let file = path.join(__dirname, './frontWindowTitle.ps1');
		return spawn('powershell.exe', ['-executionpolicy', 'bypass', '-File', file], {shell: true});
	}

	get() {
		this.nextPromise = new XPromise();
		this.send();
		return this.nextPromise;
	}
}

module.exports = FrontWindowTitleWindows;
