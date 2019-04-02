let codes = {
	// whitespace
	SPACE: 32,
	TAB: 9,
	ENTER: 13,
	BACK_SPACE: 8,
	DELETE: 46,

	// modifiers
	SHIFT: 16,
	CONTROL: 17,
	ALT: 18,
	CONTEXT_MENU: 93,
	L_WIN: 91,
	R_WIN: 92,
	L_SHIFT: 160,
	R_SHIFT: 161,
	L_CONTROL: 162,
	R_CONTROL: 164,

	// misc
	ESCAPE: 27,
	INSERT: 45,
	CAPS_LOCK: 20,
	NUM_LOCK: 144,
	SCROLL_LOCK: 145,
	PAUSE: 19,
	PRINT_SCREEN: 44,

	// cursor
	LEFT: 37,
	RIGHT: 39,
	UP: 38,
	DOWN: 40,
	HOME: 36,
	END: 35,
	PAGE_UP: 33,
	PAGE_DOWN: 34,

	// symbols
	COMMA: 188,
	SEMICOLON: 186,
	PERIOD: 190,
	DASH: 189,
	EQUALS: 187,
	QUOTE: 222,
	GRAVE: 192,
	OPEN_BRACKET: 219,
	CLOSE_BRACKET: 221,
	SLASH: 191,
	BACK_SLASH: 220,

	// function keys
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
};

for (let i = 0; i <= 9; i++)
	codes[i] = i.toString().charCodeAt();

for (let i = 'A'.charCodeAt(), z = 'Z'.charCodeAt(); i <= z; i++)
	codes[String.fromCharCode(i)] = i;

[
	['RETURN', codes.ENTER],
	['CTRL', codes.CONTROL],
	['L_CTRL', codes.L_CONTROL],
	['R_CTRL', codes.R_CONTROL],
	['ESC', codes.ESCAPE],
	[',', codes.COMMA],
	[';', codes.SEMICOLON],
	['.', codes.PERIOD],
	['-', codes.DASH],
	['=', codes.EQUALS],
	['\'', codes.QUOTE],
	['`', codes.GRAVE],
	['[', codes.OPEN_BRACKET],
	[']', codes.CLOSE_BRACKET],
	['\\', codes.SLASH],
	['/', codes.BACK_SLASH],
].forEach(([string, code]) => codes[string] = code);

let codeStrings = {};
Object.entries(codes).forEach(([string, code]) => codeStrings[code] = string);

module.exports = {codes, codeStrings};

// sources
// https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
// http://www.kbdedit.com/manual/low_level_vk_list.html
// https://www.npmjs.com/package/keycode-js
