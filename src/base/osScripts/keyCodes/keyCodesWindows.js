let codes = {
	CANCEL: 3,
	HELP: 6,
	BACK_SPACE: 8,
	TAB: 9,
	CLEAR: 12,
	RETURN: 13,
	ENTER: 14,
	SHIFT: 16,
	CONTROL: 17,
	ALT: 18,
	PAUSE: 19,
	CAPS_LOCK: 20,
	ESCAPE: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	PRINTSCREEN: 44,
	INSERT: 45,
	DELETE: 46,
	SEMICOLON: 59,
	EQUALS: 61,
	L_WIN: 91,
	R_WIN: 92,
	CONTEXT_MENU: 93,
	NUMPAD0: 96,
	NUMPAD1: 97,
	NUMPAD2: 98,
	NUMPAD3: 99,
	NUMPAD4: 100,
	NUMPAD5: 101,
	NUMPAD6: 102,
	NUMPAD7: 103,
	NUMPAD8: 104,
	NUMPAD9: 105,
	MULTIPLY: 106,
	ADD: 107,
	SEPARATOR: 108,
	SUBTRACT: 109,
	DECIMAL: 110,
	DIVIDE: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	F13: 124,
	F14: 125,
	F15: 126,
	F16: 127,
	F17: 128,
	F18: 129,
	F19: 130,
	F20: 131,
	F21: 132,
	F22: 133,
	F23: 134,
	F24: 135,
	NUM_LOCK: 144,
	SCROLL_LOCK: 145,
	L_SHIFT: 160,
	R_SHIFT: 161,
	L_CONTROL: 162,
	R_CONTROL: 164,
	SEMI_COLON: 186,
	EQUAL_SIGN: 187,
	COMMA: 188,
	DASH: 189,
	PERIOD: 190,
	SLASH: 191,
	BACK_QUOTE: 192,
	OPEN_BRACKET: 219,
	BACK_SLASH: 220,
	CLOSE_BRACKET: 221,
	QUOTE: 222,
	META: 224,
};

for (let i = 0; i <= 9; i++)
	codes[i] = i.toString().charCodeAt();

for (let i = 'A'.charCodeAt(), z = 'Z'.charCodeAt(); i <= z; i++)
	codes[String.fromCharCode(i)] = i;

[
	['ENTER', codes.RETURN],
	['CTRL', codes.CONTROL],
	['*', codes.MULTIPLY],
	['+', codes.ADD],
	['/', codes.DIVIDE],

	[',', codes.COMMA],
	['-', codes.DASH],
	['.', codes.PERIOD],
].forEach(([string, code]) => codes[string] = code);

let codeStrings = {};
Object.entries(codes).forEach(([string, code]) => codeStrings[code] = string);

module.exports = {codes, codeStrings};

// sources
// https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
// http://www.kbdedit.com/manual/low_level_vk_list.html
// https://www.npmjs.com/package/keycode-js