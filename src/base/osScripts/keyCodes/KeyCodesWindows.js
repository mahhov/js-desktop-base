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
			SHIFT: [16, 160, 161],
			L_SHIFT: 160,
			R_SHIFT: 161,
			CONTROL: [17, 162, 163],
			L_CONTROL: 162,
			R_CONTROL: 163,
			ALT: [18, 164, 165],
			L_ALT: 164,
			R_ALT: 165,
			SUPER: [91, 92],
			L_SUPER: 91,
			R_SUPER: 92,
			MENU: 93,

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
		for (let i = 1; i <= 12; i++)
			codes[`F${i}`] = i + 111;

		return codes;
	}
}

module.exports = KeyCodesWindows;

// sources
// https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
// http://www.kbdedit.com/manual/low_level_vk_list.html
// https://www.npmjs.com/package/keycode-js

// todo modifier keys not accurate
