const keySender = require('../src/base/osScripts/keySender/keySender');

setTimeout(() => {
	console.log('starting');
	// keySender.string(keySender.TYPE, '{enter}');
	keySender.strings(
		[keySender.TYPE, 'woah dude'],
		[keySender.COMBO, '{control}a'],
		[keySender.COMBO, '{control}c'],
		[keySender.TYPE, '{right}{enter}{enter}'],
		[keySender.COMBO, '{control}v'],
	);
}, 1000);
