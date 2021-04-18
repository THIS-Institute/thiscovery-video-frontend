<template>
	<question-preview
		v-if="false"
		class="max-w-xs"
		question="Who are you?"
	/>

	<question-controls
		v-else
		class="max-w-xs"
		:questions="questions"
	/>
</template>

<script>
	import QuestionPreview from '@/domain/interviews/live/questions/QuestionPreview';
	import QuestionControls from '@/domain/interviews/live/questions/QuestionControls';

	export default {
		components: {
			QuestionPreview,
			QuestionControls,
		},

		props: {
			questions: {
				type: Array,
				required: true,
			},

			participant: Boolean,
		},
	};
</script>
