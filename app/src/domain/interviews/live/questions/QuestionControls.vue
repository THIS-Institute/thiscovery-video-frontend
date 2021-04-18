<template>
	<div class="bg-white rounded-lg">
		<div class="p-5">
			<question
				:title="`Question ${index + 1}`"
				:question="activeQuestion"
				:hidden="hidden"
				@toggle-hidden="hidden = !hidden"
			/>
		</div>

		<template v-if="!hidden">
			<hr class="border-opacity-25 border-grey-400">

			<div class="flex items-center justify-between flex-wrap gap-y-2 p-5">
				<e-button
					v-if="(active !== null) && (active === index)"
					title="Active"
					icon="check"
					class="e-button--green"
					pill
					small
					@click="active = null"
				/>

				<e-button
					v-else
					title="Ask this question"
					class="e-button--red-outline"
					small
					pill
					@click="active = index"
				/>

				<div class="flex items-center space-x-1">
					<e-button
						v-for="(next, i) in [false, true]"
						:key="i"
						:icon="next ? 'chevron-right' : 'chevron-left'"
						class="e-button--red-outline"
						:disabled="next ? upperLimit : lowerLimit"
						small
						@click="onSkip(next)"
					/>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import { reactive, toRefs, computed } from 'vue';

	import Question from '@/domain/interviews/live/questions/Question';

	export default {
		components: {
			Question,
		},

		props: {
			questions: {
				type: Array,
				required: true,
			},
		},

		setup(props) {
			const state = reactive({
				index: 0,
				active: null,
				hidden: true,
			});

			const activeQuestion = computed(() => props.questions[state.index].text);

			const onSkip = (next) => state.index += next ? 1 : -1;

			const upperLimit = computed(() => (state.index + 1) === props.questions.length);
			const lowerLimit = computed(() => state.index === 0);

			return {
				...toRefs(state),
				activeQuestion,
				upperLimit,
				lowerLimit,
				onSkip,
			};
		},
	};
</script>
