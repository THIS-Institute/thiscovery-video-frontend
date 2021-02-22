<template>
	<div class="flex flex-wrap-reverse items-center gap-y-5">
		<div class="flex items-center space-x-4 mr-5">
			<span
				:class="[
					'flex items-center justify-center',
					'rounded-full p-2 w-8 h-8',
					'bg-aubergine text-white text-sm',
				]"
				v-text="toReadableValue(readSection)"
			/>

			<h2
				class="e-h3"
				v-text="activeSection.title"
			/>
		</div>

		<e-button
			title="Save and exit"
			icon="save"
			class="e-button--red-outline ml-auto"
			flipped
			small
			pill
		/>
	</div>

	<div class="relative w-full h-1 overflow-hidden rounded-full bg-white mt-3">
		<span
			:class="[
				'absolute inset-0 w-full',
				'transition-transform origin-left duration-200',
				'rounded-full bg-aubergine',
			]"
			:style="progress.style"
		/>

		<p
			class="sr-only"
			v-text="progress.text"
		/>
	</div>

	<div
		:class="[
			'grid grid-cols-12 gap-5',
			'bg-white mt-10',
			'-mx-gutter p-5 sm:p-7.5 sm:mx-0 sm:rounded-lg',
		]"
	>
		<div
			:class="[
				'col-span-12',
				'sm:col-span-10 sm:col-start-2',
				'lg:col-span-6 lg:col-start-1 lg:mx-3.5',
			]"
		>
			<question
				:number="toReadableValue(readQuestion)"
				v-bind="activeSection.questions[readQuestion]"
			/>
		</div>

		<div
			:class="[
				'col-span-12 row-start-1',
				'sm:col-span-10 sm:col-start-2',
				'lg:col-span-6 lg:col-start-7',
			]"
		>
			<div class="rounded-lg overflow-hidden bg-grey-300">
				<placeholder>
					<div class="bg-black" />
				</placeholder>

				<div class="px-5 my-5">
					<e-button
						title="Next question"
						icon="check"
						class="e-button--green"
						flipped
						small
						pill
						@click="nextQuestion()"
					/>
				</div>
			</div>

			<modal>
				<confirm v-if="true" />

				<comment v-else />
			</modal>

			<info-bar
				class="mt-2.5"
				title="Not happy with your answer?"
				:cta="{
					title: 'Click here to retake it',
				}"
				modal
				@open-modal="toggle"
			/>
		</div>
	</div>
</template>

<script>
	import { useQuestions } from '@/composables/useQuestions';

	import { computed } from 'vue';
	import { useStore } from 'vuex';

	import Question from '@/components/interviews/solo/Question';
	import InfoBar from '@/components/ui/InfoBar';
	import Modal from '@/components/ui/modal/Modal';
	import Confirm from '@/components/ui/modal/Confirm';
	import Comment from '@/components/ui/modal/Comment';

	export default {
		components: {
			Question,
			InfoBar,
			Modal,
			Confirm,
			Comment,
		},

		props: {
			sections: {
				type: Array,
				required: true,
			},
		},

		setup(props) {
			const {
				toReadableValue,
				activeQuestion,
				totalQuestions,
				activeSection,
				nextQuestion,
				readQuestion,
				readSection,
			} = useQuestions(props.sections, 0, 0);

			// Percentage progress through all questions
			const progress = computed(() => {
				const asPercentage = toReadableValue(activeQuestion.value) / totalQuestions.value;

				return {
					text: `Question ${toReadableValue(activeQuestion.value)} of ${totalQuestions.value}`,
					style: {
						transform: `scaleX(${asPercentage.toFixed(2)})`,
					},
				};
			});

			const store = useStore();
			const toggle = () => store.commit('app/toggleModal');

			return {
				toReadableValue,
				activeSection,
				nextQuestion,
				readQuestion,
				readSection,
				progress,
				toggle,
			};
		},
	};
</script>
