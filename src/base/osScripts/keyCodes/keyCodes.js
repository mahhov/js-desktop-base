const os = require('os');

let osKeyHookName = os.platform() === 'linux' ?
	'./keyCodesLinux' :
	'./keyCodesWindows';

let KeyCodes = require(osKeyHookName);

module.exports = new KeyCodes();
