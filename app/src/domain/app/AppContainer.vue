<template>
	<router-view />

	<modal-container />

	<div
		v-if="isAppLoading"
		class="relative h-screen"
	>
		<div class="e-background e-background--waves" />

		<loading-spinner />
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';

	import LoadingSpinner from '@/components/LoadingSpinner';

	export default {
		components: {
			LoadingSpinner,
		},

		setup() {
			const store = useStore();

			return {
				isAppLoading: computed(() => store.state.app.loading),
			};
		},
	};
</script>
