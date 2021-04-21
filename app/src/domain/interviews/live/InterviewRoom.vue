<template>
	<div class="flex flex-col min-h-screen h-full bg-grey-400">
		<main class="flex items-center justify-center flex-auto z-site-content">
			<div v-if="participantCount">
				<remote-video
					v-for="participant in remoteParticipants"
					:key="participant.sid"
					:participant="participant"
					@question-received="onQuestionReceived"
				/>
			</div>

			<only-caller v-else />

			<div class="flex flex-col absolute inset-0 w-full h-full">
				<div class="p-2.5 pl-4 w-full bg-gradient-to-b from-black-25">
					<div class="flex flex-wrap-reverse gap-5">
						<div class="flex flex-wrap flex-auto justify-between gap-5">
							<e-button
								title="Leave interview"
								icon="chevron-left"
								class="e-button--white-outline self-center"
								flipped
								small
								pill
							/>

							<interview-timer
								from="00:00"
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

				<div class="flex items-end mt-auto p-2.5 pl-4">
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

			if (isInterviewer.value && !hasInterviewerQuestions.value) {
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
				questionTrackPublished.promise.then(() => questionTrack.send(payload));
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
				room.value.localParticipant.on('trackPublished', onTrackPublished);
				room.value.localParticipant.on('trackPublicationFailed', onTrackPublicationFailed);

				console.log(`Successfully joined a Room: ${room.value}`);
			};

			const initParticipant = (participant) => {
				remoteParticipants[participant.sid] = participant;
				console.log(`Connected to ${participant.identity}`);
			};

			const participantCount = computed(() => Object.keys(remoteParticipants).length);

			const onParticipantDisconnect = (participant) => {
				if (remoteParticipants[participant.sid] !== undefined) {
					delete remoteParticipants[participant.sid];
				}
				
				console.log(`Participant disconnected: ${participant.identity}`);
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
			};

			if (accessToken) {
				connect(accessToken, settings)
					.then(onRoomConnect)
					.catch(onConnectError);
			}

			const onToggleCamera = (enabled) => {
				const participant = localParticipant.value;

				participant.videoTracks.forEach((publication) => {
					toggleLocalTrack(publication.track, enabled);
				});
			};

			const onToggleMute = (enabled) => {
				const participant = localParticipant.value;

				participant.audioTracks.forEach((publication) => {
					toggleLocalTrack(publication.track, enabled);
				});
			};

			const toggleLocalTrack = (track, enabled) => {
				(enabled) ? track.disable() : track.enabled();
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
			}
			
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
			}
		},
	};
</script>
