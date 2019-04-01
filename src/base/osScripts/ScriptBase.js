class ScriptBase {
	constructor() {
		this.process = this.initProcess();
	}

	async initProcess() {
		let process = await this.spawnProcess();
		process.stdout.on('data', data => this.listener && this.listener({out: data.toString()}));
		process.stderr.on('data', data => this.listener && this.listener({err: data.toString()}));
		return process;
	}

	async spawnProcess() {
		/* override */
	}

	addListener(listener) {
		this.listener = listener;
	}

	async send(arg) {
		(await this.process).stdin.write(arg + '\n');
	}
}

module.exports = ScriptBase;
