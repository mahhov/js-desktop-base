# JS Desktop Base

Helper utilities for creating an electron desktop app.

## Platform support

The `keySender` utility, which sends key presses to the OS has platform specific dependencies: 
- For windows, this relies on `powershell` and `user32.dll`.
- For linux, this relies on a `bash` script and `xdotool`.
- Not tested on mac, but should work with something similar to `xdotool` for mac.

## Utilities

### keySender

```js
const {keySender} = require('js-desktop-base');
keySender.string(keySender.TYPE, 'hello world');
keySender.strings([
	keySender.PRESS, '{shift}',
	keySender.TYPE, 'hello world',
	keySender.RELEASE, '{shift}',
	keySender.COMBO, '{ctrl}a',
	keySender.COMBO, '{ctrl}c',
]);
```

### ClipboardListener

```js
const {ClipboardListener} = require('js-desktop-base');
let clipboardListener = new ClipboardListener();
clipboardListener.addListener(data =>
	console.log('each time user copies, this will be called', data));
clipboardListener.getNext().then(data =>
	console.log('the next time the user copies, this will be called', data));
clipboardListener.copy().then(data =>
	console.log('will send ctrl+c and then invoke getNext()', data));
clipboardListener.paste('sets this text as the clipboard data and sends ctrl+v');
```

### httpRequest

```js
const {httpRequest} = require('js-desktop-base');
httpRequest.get('endpoint.com').then(response => console.log(response));
```

### ScreenMouse

```js
const {ScreenMouse} = require('js-desktop-base');
ScreenMouse.getMouse().then(({x, y}) => console.log(x, y));
ScreenMouse.getScreenBounds().then(({x, y, width, height}) => console.log(x, y, width, height));
```

### ShortcutListener

```js
const {ShortcutListener} = require('js-desktop-base');
ShortcutListener.add('Control+Shift+X', () => console.log('ctrl+shift+x preessed'));
```

### TrayHelper

```js
const {TrayHelper} = require('js-desktop-base');
TrayHelper.createExitTray('icon.png', 'tooltip');
```

### ViewHandle

```js
const {ViewHandle} = require('js-desktop-base');

class MyViewHandle extends ViewHandle {
	constructor() {
        super({
            width: 500,
            height: 450,
            frame: false,
            thickFrame: false,
            skipTaskbar: true,
            alwaysOnTop: true,
            show: false,
            webPreferences: {nodeIntegration: true}
        }, path.join(__dirname, './view/View.html'));
	}
	
    onClose() {
    	console.log('closed');
    }
    
    onMessage(message){
    	console.log('recieved message from renderer process', message)
    }
}

let viewHandle = new MyViewHandle();
viewHandle.resize(300, 300);
viewHandle.move(500, 500);
viewHandle.validateOnScreen();
viewHandle.show(3000); // show for n seconds. If 0 or not provided, will keep visible.
viewHandle.hide();
console.log('view handle is visible?', viewHandle.visible);
viewHandle.send('hi from main process');
```

### XPromise

```js
const {XPromise} = require('js-desktop-base');
let promise = new XPromise();
promise.then(a => console.log(a));
promise.catch(a => console.log(a));
if (Math.random() > .5) 
    promise.resolve('resolved');
 else
    promise.reject('rejected');
```
