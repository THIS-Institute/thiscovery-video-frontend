<template>
	<div class="bg-white rounded-lg p-5">
		<question
			title="Current question"
			:question="question"
			:hidden="hidden"
			@toggle-hidden="hidden = !hidden"
		/>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';

	import Question from '@/components/interviews/live/questions/Question';

	export default {
		components: {
			Question,
		},

		props: {
			question: {
				type: Object,
				required: true,
			},
		},

		setup() {
			const state = reactive({
				hidden: true,
			});

			return {
				...toRefs(state),
			};
		},
	};
</script>
