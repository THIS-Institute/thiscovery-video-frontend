<template>
	<div>
		The interview
	</div>

	<local-video
		v-if="hasLocalFeed"
		:participant="localParticipant"
	/>
	
	<remote-video
		v-for="participant in remoteParticipants"
		:key="participant.sid"
		:participant="participant"
	/>
</template>

<script>
	import { ref, shallowRef, shallowReactive, isReactive } from 'vue';
	import { useRoute } from 'vue-router';
	import { useStore } from 'vuex';
	import { connect } from 'twilio-video';
	import LocalVideo from './LocalVideo';
	import RemoteVideo from './RemoteVideo';

	export default {
		components: {
			LocalVideo,
			RemoteVideo,
		},

		setup() {
			const route = useRoute();
			const store = useStore();
			const hasLocalFeed = ref(false);
			const room = shallowRef({});
			const localParticipant = shallowRef({});
			const remoteParticipants = shallowReactive([]);
			const accessToken = store.state.interviews.token;

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
				console.log(isReactive(remoteParticipants));
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
			
			return {
				hasLocalFeed,
				localParticipant,
				remoteParticipants,
			}
		},
	};
</script>
