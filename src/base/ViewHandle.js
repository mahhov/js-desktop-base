const {app, BrowserWindow, ipcMain: ipc, Menu} = require('electron');
const appReadyPromise = require('./appReadyPromise');
const ScreenMouse = require('../base/ScreenMouse');

class ViewHandle {
	timedHide;

	constructor(windowOptions, windowHtml) {
		this.windowOptions = windowOptions;
		this.windowHtml = windowHtml;
		this.window = this.initWindow();
	}

	async initWindow() {
		await appReadyPromise;

		let window = new BrowserWindow(this.windowOptions);
		await window.loadFile(this.windowHtml)
			.catch(e => console.log('error loading window html:', e));

		ipc.on('window-request', (_, message) => this.onMessage(message));

		return window;
	}

	async resize(width, height) {
		this.width = width;
		this.height = height;
		(await this.window).setSize(width, height);
	}

	async move(x, y) {
		this.x = x;
		this.y = y;
		try {
			(await this.window).setPosition(x, y);
		} catch (e) {
			// Electron frequently throws: TypeError: Error processing argument at index 0, conversion failure from NaN
			console.log('Electron window.setPosition failed.');
		}
	}

	async validateOnScreen() {
		let screenBounds = await ScreenMouse.getScreenBounds();

		let x = Math.min(this.x, screenBounds.x + screenBounds.width - this.width);
		let y = Math.min(this.y, screenBounds.y + screenBounds.height - this.height);

		this.move(x, y);
	}

	// if duration is falsy, will not auto-hide
	async show(duration) {
		this.send({name: 'open'});
		(await this.window).show();
		(await this.window).restore();
		clearInterval(this.timedHide);
		if (duration)
			this.timedHide = setTimeout(this.hide.bind(this), duration);
	}

	async hide() {
		(await this.window).minimize();
		(await this.window).hide();
	}

	get visible() {
		return this.window.then(window => window.isVisible());
	}

	async send(message) {
		(await this.window).webContents.send('window-command', message);
	}

	onMessage(message) {
		/* override */
	}

	// viewHandle.addWindowListener('blur', () => {});
	async addWindowListener(event, handler) {
		(await this.window).on(event, handler);
	}
}

module.exports = ViewHandle;
