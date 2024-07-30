const os = require('os');

let osFrontWindowTitleName = os.platform() === 'linux' ?
	'./frontWindowTitleLinux' :
	'./frontWindowTitleWindows';

let FrontWindowTitle = require(osFrontWindowTitleName);

module.exports = new FrontWindowTitle();
