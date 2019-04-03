const keyHook = require('../src/base/osScripts/keyHook/keyHook');

keyHook.addShortcut('{ctrl}{l_shift}', 'ab', () =>
	console.log('Either "a" or "b" was pressed while holding down the left shift and either the left or right ctrl modifiers.'));
