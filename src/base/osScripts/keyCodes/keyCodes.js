const os = require('os');

let osKeyHookName = os.platform() === 'linux' ?
	'./keyCodesLinux' :
	'./keyCodesWindows';

module.exports = require(osKeyHookName);
