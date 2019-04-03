const KeyCodesBase = require('./KeyCodesBase');

class KeyCodesWindows extends KeyCodesBase {
	getCodes() {
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
			MENU: 93,
			L_SHIFT: 160,
			R_SHIFT: 161,
			L_CONTROL: 162,
			R_CONTROL: 164,
			L_SUPER: 91,
			R_SUPER: 92,

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
			L_BRACKET: 219,
			R_BRACKET: 221,
			SLASH: 191,
			BACKSLASH: 220,
		};

		// number keys
		for (let i = 0; i <= 9; i++)
			codes[i] = i.toString().charCodeAt();

		// alphabet keys
		for (let i = 'A'.charCodeAt(), z = 'Z'.charCodeAt(); i <= z; i++)
			codes[String.fromCharCode(i)] = i;

		// function keys
		for (let i = 1; i <= 24; i++)
			codes[`F${i}`] = i + 111;

		[
			// missing modifiers
			['SUPER', codes.L_SUPER],
			['L_ALT', codes.ALT],
			['R_ALT', codes.ALT],

			// rename keys
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
			['[', codes.L_BRACKET],
			[']', codes.R_BRACKET],
			['\\', codes.SLASH],
			['/', codes.BACKSLASH],
		].forEach(([string, code]) => codes[string] = code);

		return codes;
	}
}

module.exports = KeyCodesWindows;

// sources
// https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
// http://www.kbdedit.com/manual/low_level_vk_list.html
// https://www.npmjs.com/package/keycode-js
