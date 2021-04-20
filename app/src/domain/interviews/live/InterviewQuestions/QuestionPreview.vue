<template>
	<div
		v-if="question"
		class="bg-white rounded-lg p-5"
	>
		<question
			:question="question"
			:hidden="hidden"
			@toggle-hidden="hidden = !hidden"
		/>
	</div>
</template>

<script>
	import { ref } from 'vue';

	import Question from './Question';

	export default {
		components: {
			Question,
		},

		props: {
			question: {
				type: Object,
				default: null,
			},
		},

		setup() {
			const hidden = ref(false);

			return {
				hidden,
			};
		},
	};
</script>
