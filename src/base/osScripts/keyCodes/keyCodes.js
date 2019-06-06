const os = require('os');

let osKeyCodeName = os.platform() === 'linux' ?
	'./KeyCodesLinux' :
	'./KeyCodesWindows';

let KeyCodes = require(osKeyCodeName);

module.exports = new KeyCodes();
