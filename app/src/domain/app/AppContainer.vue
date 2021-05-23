<template>
	<router-view />

	<div
		v-if="isAppLoading"
		class="relative flex items-center h-screen"
	>
		<div class="w-full flex-initial text-center text-4xl animate-bounce font-bold text-red">
			Placeholder loading animation
		</div>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';

	export default {
		setup() {
			const store = useStore();

			return {
				isAppLoading: computed(() => store.state.app.loading),
			};
		},
	};
</script>
