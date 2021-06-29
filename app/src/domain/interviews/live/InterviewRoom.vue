<template>
	<div class="flex flex-col min-h-screen h-full bg-grey-400">
		<main class="flex items-center justify-center flex-auto z-site-content">
			<div v-if="participantCount">
				<remote-video
					v-for="participant in remoteParticipants"
					:key="participant.sid"
					:participant="participant"
					:current-speaker="speakingParticipant"
					@question-received="onQuestionReceived"
				/>
			</div>

			<template v-else>
				<transition
					enter-active-class="transform transition-all ease-out duration-300"
					leave-active-class="transform transition-all ease-in duration-200"
					enter-from-class="opacity-0 translate-y-4 sm:scale-95"
					leave-to-class="opacity-0 translate-y-4 sm:scale-95"
					appear
				>
					<only-caller />
				</transition>
			</template>

			<div class="flex flex-col absolute inset-0 w-full h-full">
				<div class="p-2.5 pl-4 w-full bg-gradient-to-b from-black-25">
					<div class="flex flex-wrap-reverse gap-5">
						<div class="flex flex-wrap flex-auto justify-between gap-5">
							<x-button
								title="Leave interview"
								icon="chevron-left"
								class="e-button--white-outline self-center"
								flipped
								small
								type="pill"
								@click="onLeave"
							/>

							<interview-timer
								v-if="participantCount && isInterviewer"
							/>
						</div>

						<modal-container>
							<join-by-phone />
						</modal-container>

						<div
							:class="[
								'flex items-center bg-grey-400',
								'rounded-lg shadow-sticky',
							]"
						>
							<user-controls
								@toggle-camera="onToggleCamera"
								@toggle-mute="onToggleMute"
							/>

							<div class="rounded-r-lg overflow-hidden w-36">
								<placeholder
									ratio="pt-3/4"
									class="bg-black-25"
								>
									<local-video
										v-if="hasLocalFeed"
										:participant="localParticipant"
									/>
								</placeholder>
							</div>
						</div>
					</div>
				</div>

				<div
					v-if="participantCount
						&& interviewerQuestions
						&& interviewerQuestions.length
					"
					class="flex items-end mt-auto p-2.5 pl-4"
				>
					<div class="fixed bottom-0 w-full -ml-4 -mr-2.5 bg-gradient-to-t from-black-75 h-20 pointer-events-none" />

					<interview-questions
						class="ml-auto z-1"
						:questions="interviewerQuestions"
						:is-interviewer="isInterviewer"
						:remote-question="remoteQuestion"
						@ask-question="onInterviewerAskQuestion"
						@stop-asking="onInterviewStopAsking"
					/>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import {
		ref,
		computed,
		shallowRef,
		shallowReactive,
		onBeforeUnmount,
	} from 'vue';
	import { useRoute } from 'vue-router';
	import { useStore } from 'vuex';
	import { connect, LocalDataTrack } from 'twilio-video';

	import LocalVideo from './LocalVideo';
	import RemoteVideo from './RemoteVideo';
	import OnlyCaller from './OnlyCaller';
	import UserControls from './UserControls';
	import InterviewTimer from './InterviewTimer';
	import ModalContainer from '@/components/modal/ModalContainer';
	import JoinByPhone from '@/components/modal/JoinByPhone';
	import InterviewQuestions from './InterviewQuestions';

	export default {
		components: {
			LocalVideo,
			RemoteVideo,
			OnlyCaller,
			UserControls,
			InterviewTimer,
			ModalContainer,
			JoinByPhone,
			InterviewQuestions,
		},

		setup() {
			const route = useRoute();
			const store = useStore();
			const hasLocalFeed = ref(false);
			const room = shallowRef({});
			const localParticipant = shallowRef({});
			const remoteParticipants = shallowReactive({});
			const accessToken = store.state.interviews.token;
			const profile = computed(() => store.state.user.profile);
			const isInterviewer = computed(() => store.state.user.isInterviewer);
			const hasInterviewerQuestions = computed(() => store.getters['interviews/hasInterviewerQuestions']);
			const interviewerQuestions = computed(() => store.state.interviews.interviewerQuestions);
			const remoteQuestion = ref(null);
			const speakingParticipant = ref(null);

			const onBeforeUnload = (event) => {
				event.preventDefault();

				if (room.value) {
					room.value.disconnect();
				}
			}

			onBeforeUnmount(() => {
				window.removeEventListener('beforeunload', onBeforeUnload);
			});

			window.addEventListener('beforeunload', onBeforeUnload);

			if (!hasInterviewerQuestions.value) {
				store.dispatch('interviews/getInterviewerQuestions');
			}

			const questionTrack = new LocalDataTrack();
			const questionTrackPublished = {};

			questionTrackPublished.promise = new Promise((resolve, reject) => {
				questionTrackPublished.resolve = resolve;
				questionTrackPublished.reject = reject;
			});

			const sendQuestionData = (message) => {
				const payload = JSON.stringify(message);
				questionTrackPublished.promise.then(() => questionTrack.send(payload))
					.catch((error) => console.error(error));
			}

			const onRoomConnect = (roomResponse) => {
				localParticipant.value = roomResponse.localParticipant;
				hasLocalFeed.value = true;
				room.value = roomResponse;

				room.value.participants.forEach(initParticipant);

				if (isInterviewer.value) {
					room.value.localParticipant.publishTrack(questionTrack);
				}
				
				room.value.on('participantConnected', initParticipant);
				room.value.on('participantDisconnected', onParticipantDisconnect);
				room.value.on('dominantSpeakerChanged', onSpeakerChange);
				room.value.localParticipant.on('trackPublished', onTrackPublished);
				room.value.localParticipant.on('trackPublicationFailed', onTrackPublicationFailed);

				if (!isInterviewer.value) {
					store.dispatch('interviews/linkRoom', room.value.sid)
				}
			};

			const initParticipant = (participant) => {
				remoteParticipants[participant.sid] = participant;
			};

			const participantCount = computed(() => Object.keys(remoteParticipants).length);

			const onParticipantDisconnect = (participant) => {
				if (remoteParticipants[participant.sid] !== undefined) {
					delete remoteParticipants[participant.sid];
				}
			};

			const onSpeakerChange = (participant) => {
				if (participant === null) {
					speakingParticipant.value = null;
					return;
				}

				if ('sid' in participant) {
					speakingParticipant.value = participant.sid;
					return;
				}

				speakingParticipant.value = null;
			};

			const onConnectError = (error) => {
				console.log(error);
			};

			const onTrackPublished = (publication) => {
				if (publication.track === questionTrack) {
					questionTrackPublished.resolve();
				}
			};

			const onTrackPublicationFailed = (error, track) => {
				if (track === questionTrack) {
					questionTrackPublished.reject(error);
				}
			};

			const settings = {
				name: route.params.id,
				dominantSpeaker: true,
			};

			if (accessToken) {
				connect(accessToken, settings)
					.then(onRoomConnect)
					.catch(onConnectError);
			}

			const onToggleCamera = (enabled) => {
				localParticipant.value.videoTracks.forEach((publication) => {
					toggleLocalTrack(publication.track, enabled);
				});
			};

			const onToggleMute = (enabled) => {
				localParticipant.value.audioTracks.forEach((publication) => {
					toggleLocalTrack(publication.track, enabled);
				});
			};

			const toggleLocalTrack = (track, enabled) => {
				(enabled) ? track.disable() : track.enable();
			};

			const onInterviewerAskQuestion = (question) => {
				sendQuestionData({
					question: question.value,
				});
			};

			const onInterviewStopAsking = () => {
				sendQuestionData({
					question: null,
				});
			};

			const onQuestionReceived = (question) => {
				remoteQuestion.value = question;
			};

			const onLeave = () => {
				if (room.value) {
					room.value.disconnect();
				}

				const completionUrl = store.state.task.completionUrl;

				if(completionUrl) {
					window.location.href = completionUrl;
				}
			};
			
			return {
				hasLocalFeed,
				localParticipant,
				participantCount,
				remoteParticipants,
				profile,
				onToggleCamera,
				onToggleMute,
				isInterviewer,
				interviewerQuestions,
				onInterviewerAskQuestion,
				onInterviewStopAsking,
				onQuestionReceived,
				remoteQuestion,
				onLeave,
				speakingParticipant,
			}
		},
	};
</script>
