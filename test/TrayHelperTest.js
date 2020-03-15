const TrayHelper = require('../src/base/TrayHelper');

let icon = 'C:/Users/manukh/personal/window-focuser/resources/hat-wizard-solid.png';

let options = [
	{label: 'yo', click: e => console.log('yo clicked', e)}
];

TrayHelper.createExitTray(icon, 'tooltip', options);
