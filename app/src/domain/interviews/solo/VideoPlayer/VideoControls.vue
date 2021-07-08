<template>
	<div
		:class="[
			'relative bg-grey-400 z-10',
			'flex flex-wrap items-center justify-between',
			'min-h-controls gap-y-5 p-5 shadow-md',
		]"
	>
		<x-button
			v-if="!isReviewing"
			title="Retake"
			icon="record"
			class="e-button--white-outline"
			flipped
			small
			type="pill"
			:disabled="isUploading"
			@click="$emit('retake')"
		/>

		<x-button
			v-if="!isReviewing"
			title="Next question"
			icon="check"
			class="e-button--green"
			flipped
			small
			type="pill"
			:disabled="isUploading"
			@click="$emit('progressQuestion')"
		/>

		<video-scrubber
			v-if="isReviewing"
			ref="scrubber"
			class="w-full my-2.25"
			@scrub="$emit('scrub', $event)"
		/>
	</div>
</template>

<script>
	import { ref, inject } from 'vue';
	import { useVideoState } from './useVideoState';

	import VideoScrubber from './VideoScrubber';

	export default {
		components: {
			VideoScrubber,
		},

		emits: [
			'scrub',
			'retake',
			'progressQuestion',
		],

		setup() {
			const scrubber = ref(null);

			const { isReviewing } = useVideoState();

			const isUploading = inject('isUploading');

			return {
				scrubber,
				isReviewing,
				isUploading,
			}
		},
	};
</script>
