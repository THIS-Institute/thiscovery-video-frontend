<template>
	<video
		ref="localVideoElement"
		autoplay
		playsinline
		class="transform -scale-x-100"
	/>
</template>

<script>
	import { useVideoPreview } from './useVideoPreview';

	export default {
		setup() {
			return { ...useVideoPreview() };
		},
	};
</script>
