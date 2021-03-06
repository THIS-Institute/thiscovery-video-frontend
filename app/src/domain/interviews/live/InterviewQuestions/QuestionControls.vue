<template>
	<div class="bg-white rounded-lg overflow-hidden">
		<div class="p-5 overflow-hidden">
			<question
				:question="activeQuestion"
				:hidden="hidden"
				:right="right"
				is-interviewer
				@toggle-hidden="hidden = !hidden"
			/>
		</div>

		<div v-show="!hidden">
			<hr class="border-opacity-25 border-grey-400">

			<div class="flex items-center justify-between flex-wrap gap-y-2 p-5">
				<x-button
					v-if="(active !== null) && (active === index)"
					title="Active"
					icon="check"
					class="e-button--green"
					type="pill"
					small
					@click="onStopAsking"
				/>

				<x-button
					v-else
					title="Ask this question"
					class="e-button--red-outline"
					small
					type="pill"
					@click="onAskQuestion"
				/>

				<div class="flex items-center space-x-1">
					<x-button
						v-for="(next, i) in [false, true]"
						:key="i"
						:icon="next ? 'chevron-right' : 'chevron-left'"
						class="e-button--red-outline"
						:disabled="next ? upperLimit : lowerLimit"
						type="icon"
						small
						@click="onSkip(next)"
					/>
				</div>
			</div>
		</div>
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
				right: true,
				active: null,
				hidden: true,
			});

			const activeQuestion = computed(() => {
				if (props.questions.length == 0) {
					return null;
				}

				return props.questions[state.index];
			});

			const onSkip = (next) => {
				state.right = next;
				state.index += next ? 1 : -1;
			};

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
