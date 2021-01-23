let requires = {
	appReadyPromise: './base/appReadyPromise',
	ClipboardListener: './base/ClipboardListener',
	frontWindowTitle: './base/osScripts/frontWindowTitle/frontWindowTitle',
	httpRequest: './base/httpRequest',
	keyHook: './base/osScripts/keyHook/keyHook',
	keySender: './base/osScripts/keySender/keySender',
	ScreenMouse: './base/ScreenMouse',
	ShortcutListener: './base/ShortcutListener',
	TrayHelper: './base/TrayHelper',
	ViewHandle: './base/ViewHandle',
	XPromise: './base/XPromise',
	RateLimitedRetryQueue: './base/RateLimitedRetryQueue',
	CustomOsScript: './base/osScripts/ScriptBase',
};

let singletonRequires = Object.entries(requires).reduce((acc, [name, path]) => Object.defineProperty(acc, name, {
	get: function () {
		let key = name + '_';
		return this[key] = this[key] || require(path);
	}
}), {});

module.exports = singletonRequires;
