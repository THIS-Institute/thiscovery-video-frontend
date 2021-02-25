<template>
	<div>
		The interview
	</div>
	<!-- <local-participant
		v-if="localParticipant"
		class="w-1/3 mt-1 mx-auto"
		:participant="localParticipant"
		:muted="isMuted"
	/>

	<remote-participant
		v-for="participant in remoteParticipants"
		:key="participant.SID"
		:participant="participant"
	/> -->
</template>

<script>
	import { useRoute } from 'vue-router';
	// import { connect } from 'twilio-video';
	// import LocalParticipant from './LocalParticipant';
	// import RemoteParticipant from './RemoteParticipant';
	export default {
		setup() {
			const route = useRoute();
			console.log(route.params);
		},
	};
</script>
