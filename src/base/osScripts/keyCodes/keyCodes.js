const os = require('os');

let osKeyHookName = os.platform() === 'linux' ?
	'./KeyCodesLinux' :
	'./KeyCodesWindows';

let KeyCodes = require(osKeyHookName);

module.exports = new KeyCodes();
