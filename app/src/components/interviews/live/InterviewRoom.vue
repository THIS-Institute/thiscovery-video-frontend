<template>
	<div>
		The interview
	</div>

	<local-video
		v-if="hasLocal"
		:participant="localParticipant"
	/>
</template>

<script>
	import { ref, shallowRef } from 'vue';
	import { useRoute } from 'vue-router';
	import { useStore } from 'vuex';
	import { connect } from 'twilio-video';
	import LocalVideo from './LocalVideo';
	// import RemoteParticipant from './RemoteParticipant';

	export default {
		components: {
			LocalVideo
		},

		setup() {
			const route = useRoute();
			const store = useStore();
			const localParticipant = shallowRef({});
			const hasLocal = ref(false);
			const accessToken = store.state.interviews.token;

			const onRoomConnect = (roomResponse) => {
				console.log(`Successfully joined a Room: ${roomResponse}`);
				localParticipant.value = roomResponse.localParticipant;
				hasLocal.value = true;
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
				hasLocal,
				localParticipant,
			}
		},
	};
</script>
