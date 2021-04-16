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
				<video-recorder
					v-if="isRecordingMode()"
					user-name="Matthew"
					@started="onRecorderStart"
					@stopped="onRecorderStop"
				/>

				<video-player
					v-if="isReviewingMode() && playbackURL"
					:video-playback-url="playbackURL"
					@progress-question="onNextQuestion"
				/>
			</div>

			<modal>
				<!-- Are you sure you want to retake? -->
				<confirm />

				<!-- Add a comment -->
				<!-- <comment /> -->
			</modal>

			<info-bar
				v-if="isRecordingMode()"
				class="mt-2.5"
				title="Having trouble recording?"
				:cta="{
					title: 'See how to fix this',
					url: '#',
				}"
			/>

			<info-bar
				v-if="isReviewingMode()"
				class="mt-2.5"
				title="Not happy with your answer?"
				:cta="{
					title: 'Click here to retake it',
				}"
				modal
				@open-modal="confirmRetake"
			/>
		</div>
	</div>
</template>

<script>
	import { computed, reactive, provide } from 'vue';
	import { useStore } from 'vuex';
	import { useQuestions } from './useQuestions';
	import { useMedia } from './useMedia';
	import { processAnswer } from './selfRecord';

	// import VideoWrapper from '@/components/interviews/settings/VideoWrapper';
	import Question from '@/components/interviews/solo/Question';
	import VideoRecorder from './VideoRecorder';
	import VideoPlayer from './VideoPlayer';

	import InfoBar from '@/components/ui/InfoBar';
	import Modal from '@/components/ui/modal/Modal';
	import Confirm from '@/components/ui/modal/Confirm';
	// import Comment from '@/components/ui/modal/Comment';

	export default {
		components: {
			// VideoWrapper,
			Question,
			InfoBar,
			Modal,
			Confirm,
			VideoRecorder,
			VideoPlayer,
			// Comment,
		},

		props: {
			sections: {
				type: Array,
				required: true,
			},
		},

		setup(props) {
			const MODE_RECORDING = 'recording';
			const MODE_REVIEWING = 'reviewing';

			const store = useStore();

			const {
				startRecording,
				stopRecording,
				playbackURL,
			} = useMedia();
			
			provide('startRecording', startRecording);
			provide('stopRecording', stopRecording);
			provide('playbackURL', playbackURL);

			const state = reactive({
				mode: MODE_RECORDING,
				isUploading: false,
			});

			provide('isUploading', state.isUploading);

			const isRecordingMode = () => {
				return state.mode === MODE_RECORDING;
			};

			const isReviewingMode = () => {
				return state.mode === MODE_REVIEWING;
			};

			const setMode = (mode) => {
				state.mode = mode;
			};

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

			const confirmRetake = () => store.commit('app/toggleModal');

			const onRecorderStart = () => {};

			const onRecorderStop = () => {
				setMode(MODE_REVIEWING);
			};

			const onNextQuestion = async () => {
				await processAnswer({
					playbackURL: playbackURL.value,
				});

				nextQuestion();
			};

			return {
				toReadableValue,
				isRecordingMode,
				isReviewingMode,
				activeSection,
				nextQuestion,
				readQuestion,
				readSection,
				progress,
				confirmRetake,
				onRecorderStart,
				onRecorderStop,
				playbackURL,
				onNextQuestion,
			};
		},
	};
</script>
