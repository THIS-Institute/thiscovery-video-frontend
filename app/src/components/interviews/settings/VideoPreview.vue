<template>
	<div class="bg-black">
		<video
			ref="localVideo"
			autoplay
			playsinline
			class="transform -scale-x-100"
		/>
	</div>
</template>

<script>
	import { useVideoPreview } from './useVideoPreview';

	export default {
		setup() {
			return { ...useVideoPreview() };
		},
	};
</script>
