let codes = {
	BACK_SPACE: 22,
	TAB: 23,
	RETURN: 36,

	ESCAPE: 9,
	1: 10,
	2: 11,
	3: 12,
	4: 13,
	5: 14,
	6: 15,
	7: 16,
	8: 17,
	9: 18,
	0: 19,
	MINUS: 20,
	EQUAL: 21,
	Q: 24,
	W: 25,
	E: 26,
	R: 27,
	T: 28,
	Y: 29,
	U: 30,
	I: 31,
	O: 32,
	P: 33,
	BRACKETLEFT: 34,
	BRACKETRIGHT: 35,
	CONTROL_L: 37,
	A: 38,
	S: 39,
	D: 40,
	F: 41,
	G: 42,
	H: 43,
	J: 44,
	K: 45,
	L: 46,
	SEMICOLON: 47,
	APOSTROPHE: 48,
	GRAVE: 49,
	SHIFT_L: 50,
	BACKSLASH: 51,
	Z: 52,
	X: 53,
	C: 54,
	V: 55,
	B: 56,
	N: 57,
	M: 58,
	COMMA: 59,
	PERIOD: 60,
	SLASH: 61,
	SHIFT_R: 62,
	ALT_L: 64,
	SPACE: 65,
	CAPS_LOCK: 66,
	F1: 67,
	F2: 68,
	F3: 69,
	F4: 70,
	F5: 71,
	F6: 72,
	F7: 73,
	F8: 74,
	F9: 75,
	F10: 76,
	NUM_LOCK: 77,
	SCROLL_LOCK: 78,
	CONTROL_R: 105,
	PRINT: 107,
	ALT_R: 108,
	HOME: 110,
	UP: 111,
	LEFT: 113,
	RIGHT: 114,
	END: 115,
	DOWN: 116,
	NEXT: 117,
	INSERT: 118,
	DELETE: 119,
	PAUSE: 127,
	SUPER_L: 133,
	SUPER_R: 134,
	MENU: 135,
}; // todo ensure same names used as in windows imlementation

for (let i = 0; i <= 9; i++)
	codes[i] = i.toString().charCodeAt();

for (let i = 'A'.charCodeAt(), z = 'Z'.charCodeAt(); i <= z; i++)
	codes[String.fromCharCode(i)] = i;

[
	['ENTER', codes.RETURN],
	['CTRL', codes.CONTROL],
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
