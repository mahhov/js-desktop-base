const os = require('os');

if (os.platform() === 'linux')
	module.exports = 'frontWindowTitle not supported on linux';
else
	module.exports = new (require('./frontWindowTitleWindows'));
