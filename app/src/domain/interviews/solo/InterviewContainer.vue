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
					:user-name="userGivenName"
					@started="onRecorderStart"
					@stopped="onRecorderStop"
				/>

				<video-player
					v-if="isReviewingMode() && playbackURL"
					:video-playback-url="playbackURL"
					@progress-question="onNextQuestion"
					@retake="openConfirmDialog"
					@add-comments="openCommentsDialog"
				/>
			</div>

			<modal-container
				v-if="state.showConfirmDialog
					|| state.showCommentDialog
				"
			>
				<!-- Are you sure you want to retake? -->
				<confirm-dialog
					v-if="state.showConfirmDialog"
					@confirm="onConfirmRetake"
					@cancel="onCancelRetake"
				>
					Are you sure you want to delete your recording and retake?
				</confirm-dialog>

				<!-- Add a comment -->
				<comment-dialog
					v-if="state.showCommentDialog"
					:comments="state.comments"
					@save="onAddedComments"
					@cancel="onCancelComments"
				/>
			</modal-container>

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
				@open-modal="openConfirmDialog"
			/>
		</div>
	</div>
</template>

<script>
	import { computed, ref, reactive, provide } from 'vue';
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

	import InfoBar from '@/components/InfoBar';
	import ModalContainer from '@/components/modal/ModalContainer';
	import ConfirmDialog from '@/components/modal/ConfirmDialog';
	import CommentDialog from '@/components/modal/CommentDialog';

	export default {
		components: {
			Question,
			InfoBar,
			ModalContainer,
			ConfirmDialog,
			VideoRecorder,
			VideoPlayer,
			CommentDialog,
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
				playbackURL,
				cleanup,
			} = useMedia();
			
			provide('startRecording', startRecording);
			provide('stopRecording', stopRecording);
			provide('playbackURL', playbackURL);

			const isUploading = ref(false);

			const state = reactive({
				mode: MODE_RECORDING,
				showConfirmDialog: false,
				showCommentDialog: false,
				comments: null,
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

			const {
				toReadableValue,
				activeQuestion,
				totalQuestions,
				activeSection,
				nextQuestion,
				readQuestion,
				readSection,
			} = useQuestions(props.questions, 0, 0);

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

			const onRecorderStart = () => {};

			const onRecorderStop = () => {
				setMode(MODE_REVIEWING);
			};

			const onNextQuestion = async () => {
				isUploading.value = true;

				const options = {
					playbackURL: playbackURL.value,
				};

				await processAnswer(options)
					.then(onAnswerProccessed);
			};

			const onAnswerProccessed = () => {
				isUploading.value = false;
				state.comments = null;
				cleanup();
				nextQuestion();
				setMode(MODE_RECORDING);
			};

			const openConfirmDialog = () => {
				state.showConfirmDialog = true;
				store.dispatch('app/openModal');
			};

			const openCommentsDialog = () => {
				state.showCommentDialog = true;
				store.dispatch('app/openModal');
			};

			const closeConfirmDialog = () => {
				state.showConfirmDialog = false;
				store.dispatch('app/closeModal');
			};

			const closeCommentsDialog = () => {
				state.showCommentDialog = false;
				store.dispatch('app/closeModal');
			};
			
			const onConfirmRetake = () => {
				cleanup();
				setMode(MODE_RECORDING);
				closeConfirmDialog();
			};

			const onCancelRetake = () => {
				closeConfirmDialog();
			};

			const onAddedComments = (comments) => {
				state.comments = comments;
				closeCommentsDialog();
			};

			const onCancelComments = () => {
				closeCommentsDialog();
			};

			const onSaveExit = () => {
				router.push({ name: ROUTE_HOME });
			};

			return {
				state,
				userGivenName,
				toReadableValue,
				isRecordingMode,
				isReviewingMode,
				activeSection,
				nextQuestion,
				readQuestion,
				readSection,
				progress,
				onRecorderStart,
				onRecorderStop,
				playbackURL,
				onNextQuestion,
				openConfirmDialog,
				openCommentsDialog,
				onConfirmRetake,
				onCancelRetake,
				onCancelComments,
				onAddedComments,
				onSaveExit,
			};
		},
	};
</script>
