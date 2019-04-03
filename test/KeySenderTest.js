const keySender = require('../src/base/osScripts/keySender/keySender');

setTimeout(() => {
	console.log('starting');
	// keySender.string(keySender.TYPE, '{enter}');
	keySender.strings(
		[keySender.TYPE, 'woah dude'],
		[keySender.COMBO, '{control}a'],
		[keySender.COMBO, '{r_ctrl}c'],
		[keySender.TYPE, '{right}{ENTER}{enter}'],
		[keySender.COMBO, '{ctrl}v'],
	);
}, 3000);
