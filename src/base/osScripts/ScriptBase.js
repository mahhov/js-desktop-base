class ScriptBase {
	constructor(...processArgs) {
		this.processArgs = processArgs;
		this.restartProcess();
	}

	async initProcess() {
		let process = await this.spawnProcess(...this.processArgs);
		process.stdout.on('data', data => this.listener && this.listener({out: data.toString()}));
		process.stderr.on('data', data => this.listener && this.listener({err: data.toString()}));
		process.on('exit', () => this.listener && this.listener({exit: true}));
		return process;
	}

	async spawnProcess(...args) {
		/* override */
	}

	restartProcess() {
		this.process = this.initProcess();
	}

	addListener(listener) {
		this.listener = listener;
	}

	async send(arg) {
		this.process.then(process =>
			process.stdin.write(arg + '\n'));
	}
}

module.exports = ScriptBase;
