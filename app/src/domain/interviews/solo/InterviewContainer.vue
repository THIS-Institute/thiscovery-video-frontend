<template>
	<div class="flex flex-wrap-reverse items-center gap-y-5">
		<div class="flex items-center space-x-4 mr-5">
			<span
				:class="[
					'flex items-center justify-center',
					'rounded-full p-2 w-8 h-8',
					'bg-aubergine text-white text-sm',
				]"
				v-text="toReadableValue(sectionIndex)"
			/>

			<transition
				enter-active-class="transform transition-all ease-out duration-300"
				leave-active-class="transform transition-all ease-in duration-200"
				enter-from-class="opacity-0 translate-x-4 sm:scale-95"
				leave-to-class="opacity-0 translate-x-4 sm:scale-95"
				mode="out-in"
			>
				<h2
					:key="section.title"
					class="e-h3"
					v-text="section.title"
				/>
			</transition>
		</div>

		<x-button
			title="Save and exit"
			icon="save"
			class="e-button--red-outline ml-auto"
			flipped
			small
			type="pill"
			:disabled="state.savingExiting"
			@click="onSaveExit"
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

	<transition
		enter-active-class="transform transition-all ease-out duration-300"
		enter-from-class="opacity-0 translate-y-4 sm:scale-95"
		appear
	>
		<section
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
				<transition
					enter-active-class="transform transition-all ease-out delay-150 duration-300"
					leave-active-class="transform transition-all ease-in duration-200"
					enter-from-class="opacity-0 translate-y-4 sm:scale-95"
					leave-to-class="opacity-0 translate-y-4 sm:scale-95"
					mode="out-in"
				>
					<aside :key="toReadableValue(questionIndex)">
						<question
							:number="toReadableValue(questionIndex)"
							v-bind="section.questions[questionIndex]"
						/>
					</aside>
				</transition>
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
						:user-name="userGivenName"
						@started="onRecorderStart"
						@pause="onRecorderPause"
						@resume="onRecorderResume"
						@stopped="onRecorderStop"
						@startCamera="onCameraStart"
						@stopCamera="onCameraStop"
					/>

					<video-player
						v-if="isReviewingMode() && playbackURL"
						:video-playback-url="playbackURL"
						@progress-question="onNextQuestion"
						@retake="openModal(modals.retake, retakeCallbacks)"
						@add-comments="openModal(commentOptions, commentCallbacks)"
					/>
				</div>

				<info-bar
					v-if="isRecordingMode() || isReviewingMode()"
					class="mt-2.5"
					title="Having trouble recording?"
					:cta="{
						title: 'See how to fix this',
					}"
					modal
					@open-modal="openModal(modals.troubleshoot)"
				/>
			</div>
		</section>
	</transition>
</template>

<script>
	import { computed, ref, reactive, onMounted, provide, watch } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';
	import { ROUTE_HOME } from '@/routeConstants';
	import { useQuestions } from './useQuestions';
	import { useMedia } from './useMedia';
	import { useUser } from '@/auth/useUser';
	import { processAnswer } from './selfRecord';

	import Question from '@/domain/interviews/solo/Question';
	import VideoRecorder from './VideoRecorder';
	import VideoPlayer from './VideoPlayer';

	import modals from '@/modals';

	import InfoBar from '@/components/InfoBar';

	export default {
		components: {
			Question,
			InfoBar,
			VideoRecorder,
			VideoPlayer,
		},

		props: {
			questions: {
				type: Array,
				required: true,
			},
		},

		setup(props) {
			const MODE_RECORDING = 'recording';
			const MODE_REVIEWING = 'reviewing';

			const store = useStore();
			const router = useRouter();

			const {
				startRecording,
				stopRecording,
				pauseRecording,
				resumeRecording,
				playbackURL,
				cleanup,
				startVideoTracks,
				stopVideoTracks,
			} = useMedia();
			
			provide('startRecording', startRecording);
			provide('stopRecording', stopRecording);
			provide('playbackURL', playbackURL);

			const isUploading = ref(false);

			const state = reactive({
				mode: MODE_RECORDING,
				questionStartedAt: null,
				questionEndedAt: null,
				responseStartedAt: null,
				responseEndedAt: null,
				retakeCount: 0,
				savingExiting: false,
			});

			const { userGivenName } = useUser();

			provide('isUploading', isUploading);

			const isRecordingMode = () => {
				return state.mode === MODE_RECORDING;
			};

			const isReviewingMode = () => {
				return state.mode === MODE_REVIEWING;
			};

			const setMode = (mode) => {
				state.mode = mode;
			};

			let initialSectionIndex = 0;
			let initialQuestionIndex = 0;
			
			if (store.getters['interviews/hasInterviewProgress']) {
				const previousState = store.state.interviews.previousProgress;
				
				initialSectionIndex = previousState.section ?? 0;
				initialQuestionIndex = previousState.question ?? 0;
			}

			const {
				toReadableValue,
				questionSequenceIndex,
				totalQuestions,
				section,
				nextQuestion,
				questionIndex,
				sectionIndex,
				isComplete,
			} = useQuestions(
				props.questions,
				initialSectionIndex,
				initialQuestionIndex,
			);

			watch(isComplete, async () => {
				const completionUrl = store.state.task.completionUrl;

				await store.dispatch('interviews/selfRecordComplete');

				if(isComplete.value && completionUrl) {
					window.location.href = completionUrl;
				}
			});

			// Percentage progress through all questions
			const progress = computed(() => {
				const asPercentage = toReadableValue(questionSequenceIndex.value) / totalQuestions.value;

				return {
					text: `Question ${toReadableValue(questionSequenceIndex.value)} of ${totalQuestions.value}`,
					style: {
						transform: `scaleX(${asPercentage.toFixed(2)})`,
					},
				};
			});

			const onRecorderStart = () => {
				state.responseStartedAt = getTimeStringNow();
			};

			const onRecorderStop = () => {
				state.responseEndedAt = getTimeStringNow();
				setMode(MODE_REVIEWING);
			};

			const onRecorderPause = () => {
				pauseRecording();
			}

			const onRecorderResume = () => {
				resumeRecording();
			}

			const onNextQuestion = async () => {
				isUploading.value = true;
				state.questionEndedAt = getTimeStringNow();

				const questionData = section.value.questions[questionIndex.value];

				const options = {
					interviewId: store.state.interviews.id,
					anonUserId: store.state.user.anonUserId,
					anonUserTaskId: store.state.user.anonUserTaskId,
					projectTaskId: store.state.user.projectTaskId,
					taskId: store.state.task.id,
					questionId: questionData.id,
					questionSequence: questionData.sequence,
					questionStartedAt: state.questionStartedAt,
					questionEndedAt: state.questionEndedAt,
					responseStartedAt: state.responseStartedAt,
					responseEndedAt: state.responseEndedAt,
					retakeCount: state.retakeCount,
				};

				await processAnswer(playbackURL.value, options)
					.then(onAnswerProccessed);
			};

			const onAnswerProccessed = () => {
				state.retakeCount = 0;
				isUploading.value = false;
				commentOptions.value.comments = null;
				cleanup();
				nextQuestion();
				setMode(MODE_RECORDING);

				state.questionStartedAt = getTimeStringNow();
			};

			const retakeCallbacks = {
				confirm: () => {
					cleanup();
					setMode(MODE_RECORDING);
					commentOptions.value.comments = null;
					store.dispatch('app/closeModal');
					state.retakeCount++;
				},
			};

			const commentOptions = {
				type: 'Comment',
				value: {
					comments: null,
				},
			};

			const commentCallbacks = {
				save: (comments) => {
					commentOptions.value.comments = comments;
					store.dispatch('app/closeModal');
				},
			};

			const openModal = (options, callbacks) => {
				store.dispatch('app/openModal', { ...options, callbacks });
			};

			const onSaveExit = async () => {
				state.savingExiting = true;

				await store.dispatch('interviews/selfRecordSaveExit', {
					question: questionIndex.value,
					section: sectionIndex.value,
				});

				router.push({ name: ROUTE_HOME });

				state.savingExiting = false;
			};

			const onCameraStart = () => {
				startVideoTracks();
			}

			const onCameraStop = () => {
				stopVideoTracks();
			}

			const getTimeStringNow = () => {
				return (new Date()).toISOString();
			}

			onMounted(() => {
				state.questionStartedAt = getTimeStringNow();
			})

			return {
				state,
				userGivenName,
				toReadableValue,
				isRecordingMode,
				isReviewingMode,
				section,
				nextQuestion,
				questionIndex,
				sectionIndex,
				progress,
				onRecorderStart,
				onRecorderStop,
				onRecorderPause,
				onRecorderResume,
				playbackURL,
				onNextQuestion,
				onSaveExit,
				onCameraStart,
				onCameraStop,

				modals,
				retakeCallbacks,
				commentCallbacks,
				commentOptions,
				openModal,
			};
		},
	};
</script>
