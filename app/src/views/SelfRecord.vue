<template>
	<section class="e-container flex min-h-screen h-full md:items-center">
		<div class="grid grid-cols-12 w-full gap-5 mt-12 md:my-18 xl:my-24">
			<div
				:class="[
					'col-span-12',
					'md:col-span-10 md:col-start-2',
					'xl:col-span-8 xl:col-start-3',
				]"
			>
				<interview-container
					v-if="hasQuestions"
					:questions="questions"
				/>

				<loading-spinner v-else />
			</div>
		</div>
	</section>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';

	import InterviewContainer from '@/domain/interviews/solo/InterviewContainer';
	import LoadingSpinner from '@/components/LoadingSpinner';

	export default {
		components: {
			InterviewContainer,
			LoadingSpinner,
		},

		setup() {
			const store = useStore();

			const questions = computed(() => {
				return store.state.interviews.selfRecordQuestions;
			});

			const hasQuestions = computed(() => {
				return questions.value.length > 0;
			});

			store.dispatch('interviews/getSelfRecordQuestions');

			return {
				hasQuestions,
				questions,
			};
		},
	};
</script>
