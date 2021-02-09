import debounce from 'lodash/debounce';
import variables from '../../variables.json';
import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue';

const breakpoints = {};

Object.keys(variables.breakpoints).forEach((name) => {
	let value = variables.breakpoints[name];

	if (variables['em-media-queries']) {
		value /= variables.defaultFontSize || 16;
	}

	breakpoints[name] = value;
});

export function useViewport(onViewportResized) {
	let onDebouncedResize;

	function getMediaQuery(name, extremum = 'min', property = 'width') {
		if (!window.matchMedia) {
			return false;
		}

		let value = breakpoints[name];

		if (!value) {
			throw new Error(`Unkown breakpoint: ${name} is not defined`);
		}

		if (extremum === 'max') {
			value -= variables['em-media-queries'] ? 0.01 : 1;
		}

		const unit = variables['em-media-queries'] ? 'em' : 'px';

		return window.matchMedia(`only screen and (${extremum}-${property}: ${value}${unit})`).matches;
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
