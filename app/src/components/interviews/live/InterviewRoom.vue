<template>
	<div class="flex flex-col min-h-screen h-full bg-grey-400">
		<main class="flex items-center justify-center flex-auto z-site-content">
			<div v-if="remoteParticipants.length">
				<remote-video
					v-for="participant in remoteParticipants"
					:key="participant.sid"
					:participant="participant"
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

							<timer
								from="01:56"
							/>
						</div>

						<div
							:class="[
								'flex items-center bg-grey-400',
								'rounded-lg shadow-sticky',
							]"
						>
							<user-controls />

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

				<!-- <div
					v-if="interviewer"
					class="flex items-end mt-auto p-2.5 pl-4"
				>
					<p
						class="absolute e-h4 my-6"
						v-text="interviewer.name"
					/>

					<question-wrapper
						class="ml-auto z-1"
						:questions="questions"
						:participant="false"
					/>
				</div> -->
			</div>
		</main>
	</div>
</template>

<script>
	import { ref, toRefs, computed, shallowRef, reactive, shallowReactive } from 'vue';
	import { useRoute } from 'vue-router';
	import { useStore } from 'vuex';
	import { connect } from 'twilio-video';

	import LocalVideo from './LocalVideo';
	import RemoteVideo from './RemoteVideo';
	import OnlyCaller from './OnlyCaller';
	import UserControls from './UserControls';
	import Timer from '@/components/ui/Timer';
	// import QuestionWrapper from './QuestionWrapper';

	export default {
		components: {
			LocalVideo,
			RemoteVideo,
			OnlyCaller,
			UserControls,
			Timer,
			// QuestionWrapper,
		},

		setup() {
			const route = useRoute();
			const store = useStore();
			const hasLocalFeed = ref(false);
			const room = shallowRef({});
			const localParticipant = shallowRef({});
			const remoteParticipants = shallowReactive([]);
			const accessToken = store.state.interviews.token;
			const profile = computed(() => store.state.user.profile);

			const onRoomConnect = (roomResponse) => {
				localParticipant.value = roomResponse.localParticipant;
				hasLocalFeed.value = true;
				room.value = roomResponse;

				room.value.participants.forEach(initParticipant);

				room.value.on('participantConnected', initParticipant);
				room.value.on('participantDisconnected', onParticipantDisconnect);

				console.log(`Successfully joined a Room: ${room.value}`);
			};

			const initParticipant = (participant) => {
				remoteParticipants.push(participant);
				console.log(`"Connected to ${participant.identity}"`);
			};

			const onParticipantDisconnect = (participant) => {
				remoteParticipants.value = remoteParticipants
					.filter(rParticipant => rParticipant.sid !== participant.sid);

				console.log(`Participant disconnected: ${participant.identity}`);
			};

			const onConnectError = (error) => {
				console.log(error);
			};

			const settings = {
				name: route.params.id,
			};

			if (accessToken) {
				connect(accessToken, settings)
					.then(onRoomConnect)
					.catch(onConnectError);
			}

			// To refactor
			const state = reactive({
				interviewer: {
					name: "Cameron Williamson",
				},
			});
			
			return {
				...toRefs(state),
				hasLocalFeed,
				localParticipant,
				remoteParticipants,
				profile,
			}
		},
	};
</script>
