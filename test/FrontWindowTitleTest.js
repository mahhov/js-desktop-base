const frontWindowTitle = require('../src/base/osScripts/frontWindowTitle/frontWindowTitle');

// frontWindowTitle.addListener(a => console.log('listener', a));
// setInterval(async () => frontWindowTitle.send(), 1000);

setInterval(async () => frontWindowTitle.get().then(a => console.log(a)), 1000);
