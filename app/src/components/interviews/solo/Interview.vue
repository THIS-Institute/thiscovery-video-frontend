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
			<div class="rounded-lg overflow-hidden bg-grey-400">
				<video-wrapper
					:pre-record="preRecord"
					:recording="recording"
					:loading="loading"
					:stopped="stopped"
					:reviewing="reviewing"
				/>

				<div class="flex flex-wrap items-center justify-between gap-y-5 px-5 my-5">
					<e-button
						v-if="preRecord"
						title="Click to record your answer"
						icon="record"
						class="e-button--red mx-auto"
						flipped
						small
						pill
					/>

					<e-button
						v-else-if="loading"
						title="Cancel"
						class="e-button--white-outline mx-auto"
						small
						pill
					/>

					<e-button
						v-else-if="recording"
						title="Stop recording"
						icon="stop"
						class="e-button--white-outline mx-auto"
						flipped
						small
						pill
					/>

					<template v-else-if="stopped">
						<e-button
							title="Add more"
							icon="record"
							class="e-button--white-outline"
							flipped
							small
							pill
						/>

						<e-button
							title="Next question"
							icon="check"
							class="e-button--green"
							flipped
							small
							pill
							@click="nextQuestion()"
						/>
					</template>

					<scrubber
						v-else-if="reviewing"
						class="w-full"
					/>
				</div>
			</div>

			<modal>
				<!-- Are you sure you want to retake? -->
				<confirm />

				<!-- Add a comment -->
				<!-- <comment /> -->
			</modal>

			<info-bar
				v-if="preRecord || loading || recording"
				class="mt-2.5"
				title="Having trouble recording?"
				:cta="{
					title: 'See how to fix this',
					url: '#',
				}"
			/>

			<info-bar
				v-if="stopped || reviewing"
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

	import VideoWrapper from '@/components/interviews/settings/VideoWrapper';
	import Question from '@/components/interviews/solo/Question';

	import InfoBar from '@/components/ui/InfoBar';
	import Modal from '@/components/ui/modal/Modal';
	import Confirm from '@/components/ui/modal/Confirm';
	import Scrubber from '@/components/ui/Scrubber';
	// import Comment from '@/components/ui/modal/Comment';

	export default {
		components: {
			VideoWrapper,
			Question,
			InfoBar,
			Modal,
			Confirm,
			Scrubber,
			// Comment,
		},

		props: {
			sections: {
				type: Array,
				required: true,
			},

			// User has not yet started recording
			preRecord: Boolean,

			// User has clicked record and is loading
			loading: Boolean,

			// User is now recording their answer
			recording: Boolean,

			// User has stopped the recording
			stopped: Boolean,

			// User is rewatching their answer
			reviewing: Boolean,
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
