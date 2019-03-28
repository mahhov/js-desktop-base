const path = require('path');
const ViewHandle = require('../src/base/ViewHandle');

class ViewHandleTest extends ViewHandle {
	constructor() {
		super({
			width: 400,
			height: 400,
		}, path.join(__dirname, './view.html'));
	}
}

let view = new ViewHandleTest();
