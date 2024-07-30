// LINUX ONLY

const fs = require('fs').promises;
const path = require('path');
const {spawn} = require("child_process");
const ScriptBase = require('../ScriptBase');
const XPromise = require('../../XPromise');

class FrontWindowTitleLinux extends ScriptBase {
	constructor() {
		super();
		this.addListener(a => this.nextPromise?.resolve(a));
	}

	async spawnProcess() {
		return spawn(path.join(__dirname, './frontWindowTitle.sh'));
	}

	get() {
		this.nextPromise = new XPromise();
		this.send();
		return this.nextPromise;
	}
}

module.exports = FrontWindowTitleLinux;
