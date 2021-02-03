const mapKeys = require('lodash/mapKeys');
const mapValues = require('lodash/mapValues');
const range = require('lodash/range');

const variables = require('./variables.json');

// converters and calculators
const relative = (px, unit = 'rem', base = variables['browser-default-font-size']) => `${px / base}${unit}`;
const ratio = (x, y) => `${y / x * 100}%`;

// Values
const screens = mapValues(variables.breakpoints, px => relative(px, 'em'));
const colors = variables['colors'];
const columns = variables.columns;
const widths = mapKeys(mapValues(range(0, columns), (v) => ratio(columns, v + 1)), (v, k) => `${parseInt(k, 10) + 1}/${columns}`);
const z = variables['z-indexes'];
const zIndex = z.reduce((v, name, i) => ({ ...v, [name]: z.length - i }), {});

module.exports = {
	theme: {
		screens,
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			inherit: 'inherit',
			...colors,
		},
		fontSize: {
			sm: relative(14),
			base: relative(16),
			lg: relative(18),
			xl: relative(20),
			'2xl': relative(24),
			'3xl': relative(32),
			'4xl': relative(38),
			'5xl': relative(58),
			full: '100%',
		},
		fontWeight: {
			normal: 400,
			bold: 700,
		},
		fontFamily: {
			body: ['Brown', 'Helvetica', 'sans-serif'],
			heading: ['Brown', 'Georgia', 'serif'],
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
			inset: (theme, { negative }) => ({
				'1/2': '50%',
				...widths,
				...(negative(widths)),
			}),
			spacing: {
				em: '1em',
				'1/2em': '.5em',
				'1/3em': '.33em',
				'3.5': relative(14),
				'7.5': relative(30),

				gutter: relative(20),
				margin: relative(60),
			},
			padding: {
				logo: ratio(495, 103),
			},
			maxWidth: {
				container: relative(1440),
				logo: relative(145),
			},
			width: {
				...widths,
			},
		},
	},
	variants: {},
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
