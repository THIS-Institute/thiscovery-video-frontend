<template>
	<h1	class="e-h3 max-w-sm text-center">
		Are you sure you want to delete your recording and retake?
	</h1>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<e-button
			title="cancel"
			class="e-button--red-outline"
			small
			pill
			@click="toggle"
		/>

		<e-button
			title="Yes, retake"
			icon="retake"
			class="e-button--red"
			flipped
			small
			pill
		/>
	</div>
</template>

<script>
	import { useStore } from 'vuex';

	export default {
		setup() {
			const store = useStore();
			const active = store.state.app.modalActive;

			const toggle = () => {
				if (active) store.commit('app/toggleModal');
			};

			return {
				toggle,
			};
		},
	};
</script>
