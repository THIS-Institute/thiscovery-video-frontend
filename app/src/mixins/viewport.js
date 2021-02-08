import debounce from 'lodash/debounce';
import variables from '../../variables.json';

import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue';

export default function () {
	let onDebouncedResize;

	const relative = (px, unit = 'rem', base = variables['browser-default-font-size']) => `${px / base}${unit}`;

	function sort(breakpoint) {
		['width', 'height']
			.filter(dimension => breakpoint[dimension])
			.map(dimension => `(min-${dimension}: ${relative(breakpoint[dimension], 'em')})`)
			.join(' and ');
	};

	function onResize() {};

	function mq(name) {
		if (!window.matchMedia) {
			return false;
		}

		const { breakpoints } = variables;

		const breakpoint = breakpoints[name];

		if (!breakpoint) {
			throw new Error(`Unkown breakpoint: ${name} is not defined`);
		}

		return window.matchMedia(sort(breakpoint)).matches;
	};

	onBeforeMount(() => {
		onDebouncedResize = debounce(() => onResize(), 300);
	});

	onMounted(() => {
		onResize();

		window.addEventListener('resize', onDebouncedResize);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', onDebouncedResize);
	});

	return {
		onResize,
		mq,
	};
};
