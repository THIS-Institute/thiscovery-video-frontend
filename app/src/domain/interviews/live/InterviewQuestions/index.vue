<template>
	<question-controls
		v-if="isInterviewer && (questions && questions.length > 0)"
		class="max-w-xs w-full shadow-sticky"
		:questions="questions"
		@ask-question="$emit('askQuestion', $event)"
		@stop-asking="$emit('stopAsking')"
	/>

	<question-preview
		v-else-if="remoteQuestion"
		class="max-w-xs w-full shadow-sticky"
		:question="remoteQuestion"
	/>
</template>

<script>
	import QuestionPreview from './QuestionPreview';
	import QuestionControls from './QuestionControls';

	export default {
		name: 'Questions',

		components: {
			QuestionPreview,
			QuestionControls,
		},

		props: {
			questions: {
				type: Array,
				default: null,
			},

			remoteQuestion: {
				type: Object,
				default: null,
			},

			isInterviewer: {
				type: Boolean,
				default: false,
			},
		},

		emits: [
			'askQuestion',
			'stopAsking',
		],
	};
</script>
