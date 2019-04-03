const KeyCodesBase = require('./KeyCodesBase');

class KeyCodesLinux extends KeyCodesBase {
	getCodes() {
		let codes = {
			// whitespace
			SPACE: 65,
			TAB: 23,
			ENTER: 36,
			BACK_SPACE: 22,
			DELETE: 119,

			// modifiers
			SHIFT: [50, 62],
			L_SHIFT: 50,
			R_SHIFT: 62,
			CONTROL: [37, 105],
			L_CONTROL: 37,
			R_CONTROL: 105,
			ALT: [64, 109],
			L_ALT: 64,
			R_ALT: 108,
			SUPER: [133, 134],
			L_SUPER: 133,
			R_SUPER: 134,
			MENU: 135,

			// misc
			ESCAPE: 9,
			INSERT: 118,
			CAPS_LOCK: 66,
			NUM_LOCK: 77,
			SCROLL_LOCK: 78,
			PAUSE: 127,
			PRINT_SCREEN: 107,

			// cursor
			LEFT: 113,
			RIGHT: 114,
			UP: 111,
			DOWN: 116,
			HOME: 110,
			END: 115,
			PAGE_UP: 112,
			PAGE_DOWN: 117,

			// symbols
			COMMA: 59,
			SEMICOLON: 47,
			PERIOD: 60,
			DASH: 20,
			EQUALS: 21,
			QUOTE: 48,
			GRAVE: 49,
			L_BRACKET: 34,
			R_BRACKET: 35,
			SLASH: 61,
			BACKSLASH: 51,

			// alphabet keys
			A: 38,
			B: 56,
			C: 54,
			D: 40,
			E: 26,
			F: 41,
			G: 42,
			H: 43,
			I: 31,
			J: 44,
			K: 45,
			L: 46,
			M: 58,
			N: 57,
			O: 32,
			P: 33,
			Q: 24,
			R: 27,
			S: 39,
			T: 28,
			U: 30,
			V: 55,
			W: 25,
			X: 53,
			Y: 29,
			Z: 52,
		};

		// number keys
		codes[0] = 19;
		for (let i = 1; i <= 9; i++)
			codes[i] = i + 9;

		// function keys
		for (let i = 1; i <= 10; i++)
			codes[`F${i}`] = i + 66;
		codes['F11'] = 95;
		codes['F12'] = 96;

		return codes;
	}
}

module.exports = KeyCodesLinux;

// sources
// xmodmap -pke
