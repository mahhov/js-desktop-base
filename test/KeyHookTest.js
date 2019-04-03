const keyHook = require('../src/base/osScripts/keyHook/keyHook');

keyHook.addShortcut([], ['A', 'B'], () => console.log('a or b pressed'));
