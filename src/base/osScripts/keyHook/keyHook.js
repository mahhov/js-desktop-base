const os = require('os');

let osKeyHookName = os.platform() === 'linux' ?
	'./KeyHookLinux' :
	'./KeyHookWindows';

let KeyHook = require(osKeyHookName);

module.exports = new KeyHook();
