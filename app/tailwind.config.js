/* eslint-env node */
const mapKeys = require('lodash/mapKeys');
const mapValues = require('lodash/mapValues');
const range = require('lodash/range');

const variables = require('./variables.json');

// converters and calculators
const relative = (px, unit = 'rem', base = variables.defaultFontSize) => `${px / base}${unit}`;
const ratio = (x, y) => `${y / x * 100}%`;

// Values
const screens = mapValues(variables.breakpoints, px => relative(px, 'em'));
const columns = variables.columns;
const widths = mapKeys(mapValues(range(0, columns), (v) => ratio(columns, v + 1)), (v, k) => `${parseInt(k, 10) + 1}/${columns}`);
const zIndexes = variables.zIndexes;
const zIndex = zIndexes.reduce((v, name, i) => ({ ...v, [name]: zIndexes.length - i }), {});

module.exports = {
	theme: {
		screens,
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			inherit: 'inherit',
			...variables.colors,
		},
		boxShadow: {
			md: '0 25px 50px -12px rgba(0, 0, 0, 1)',
			sticky: '0px 4px 50px rgba(0, 0, 0, 0.25)',
		},
		fontSize: {
			sm: relative(14),
			base: relative(16),
			lg: relative(18),
			xl: relative(20),
			'2xl': relative(22),
			'3xl': relative(24),
			'4xl': relative(28),
			'5xl': relative(32),
			'6xl': relative(38),
			'7xl': relative(58),
			full: '100%',
		},
		fontWeight: {
			normal: 400,
			bold: 700,
		},
		fontFamily: {
			sans: ['Brown', 'Helvetica', 'sans-serif'],
			system: ['system-ui', 'sans-serif'],
		},
		letterSpacing: {
			tight: '-1px',
			snug: '-0.66px',
			normal: 0,
		},
		lineHeight: {
			reduced: 0.95,
			none: 1,
			tight: 1.12,
			snug: 1.4,
			normal: 1.56,
			relaxed: 1.75,
			loose: 2,
		},
		zIndex: {
			...zIndex,
			0: 0,
			'-1': -1,
		},
		extend: {
			backgroundSize: {
				'100': relative(400),
				'200': relative(800),
				'300': relative(1200),
			},
			inset: (theme, { negative }) => ({
				'1/2': '50%',
				...widths,
				...(negative(widths)),
			}),
			minHeight: {
				'date-picker': relative(485),
				'controls': relative(48),
			},
			maxHeight: {
				'date-picker': relative(445),
			},
			maxWidth: {
				'36': relative(144),
				logo: relative(150),
				'64': relative(256),
				'83': relative(332),
				'86': relative(344),
				container: relative(1440),
				'container-xl': relative(1600),
			},
			padding: {
				full: ratio(1, 1),
				logo: ratio(495, 103),
				instruction: ratio(275, 428),

				'doctor': ratio(191, 526),
				'doctor-wave': ratio(234, 565),
				'paramedic': ratio(355, 344),
				'nurse': ratio(344, 526),
				'clipboard': ratio(286, 526),
				'surgeon': ratio(281, 526),

				'9/16': ratio(16, 9),
				'3/4': ratio(4, 3),
			},
			scale: {
				'-100': '-1',
			},
			spacing: {
				em: '1em',
				'1/2em': '.5em',
				'1/3em': '.33em',
				'1.5': relative(6),
				'2.5': relative(10),
				'3.5': relative(14),
				'4.5': relative(18),
				'7.5': relative(30),
				'11.25': relative(45),
				'17': relative(68),
				'18': relative(72),

				gutter: relative(20),
				margin: relative(60),
				'1/2-screen': '50vw',
			},
			width: {
				...widths,
			},
			transitionDuration: {
				'10000': '10000ms',
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['hover', 'disabled', 'focus'],
			borderColor: ['hover', 'disabled', 'focus'],
			textColor: ['hover', 'disabled', 'focus'],
			opacity: ['hover', 'disabled', 'focus'],
			display: ['hover', 'disabled', 'focus', 'group-hover'],
		},
	},
	corePlugins: {
		container: false,
	},
	purge: [
		'./public/index.html',
		'./src/**/*.js',
		'./src/**/*.vue',
	],
	darkMode: false,
}
