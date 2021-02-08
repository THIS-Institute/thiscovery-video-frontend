import debounce from 'lodash/debounce';
import variables from '@/../variables.json';
import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue';

export function useViewport(onViewportResized) {
	let onDebouncedResize;

	function relative(px, unit = 'rem', base = variables.defaultFontSize) {
		return `${px / base}${unit}`;
	}

	function sort(breakpoint) {
		['width', 'height']
			.filter(dimension => breakpoint[dimension])
			.map(dimension => `(min-${dimension}: ${relative(breakpoint[dimension], 'em')})`)
			.join(' and ');
	};

	function getMediaQuery(name) {
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
		onDebouncedResize = debounce(() => onViewportResized(), 300);
	});

	onMounted(() => {
		onViewportResized();
		window.addEventListener('resize', onDebouncedResize);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', onDebouncedResize);
	});

	return {
		getMediaQuery,
	};
};
