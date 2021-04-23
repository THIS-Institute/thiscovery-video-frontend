<template>
	<div class="bg-white rounded-lg">
		<div class="p-5">
			<question
				:question="activeQuestion"
				:hidden="hidden"
				is-interviewer
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
					@click="onStopAsking"
				/>

				<e-button
					v-else
					title="Ask this question"
					class="e-button--red-outline"
					small
					pill
					@click="onAskQuestion"
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

	import Question from './Question';

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

		emits: [
			'askQuestion',
			'stopAsking',
		],

		setup(props, { emit }) {
			const state = reactive({
				index: 0,
				active: null,
				hidden: true,
			});

			const activeQuestion = computed(() => {
				if (props.questions.length == 0) {
					return null;
				}

				return props.questions[state.index];
			});

			const onSkip = (next) => state.index += next ? 1 : -1;

			const upperLimit = computed(() => (state.index + 1) === props.questions.length);
			const lowerLimit = computed(() => state.index === 0);

			const onAskQuestion = () => {
				state.active = state.index;
				emit('askQuestion', activeQuestion);
			};

			const onStopAsking = () => {
				state.active = null;
				emit('stopAsking');
			};

			return {
				...toRefs(state),
				onAskQuestion,
				onStopAsking,
				activeQuestion,
				upperLimit,
				lowerLimit,
				onSkip,
			};
		},
	};
</script>
