<template>
	<div class="e-container">
		<x-button
			title="Back"
			icon="chevron-left"
			class="text-red hover:text-black active:text-black"
			type="subtle"
			flipped
			@click="back"
		/>
	</div>
</template>

<script>
	import { useRouter } from 'vue-router';
	import { useStore } from 'vuex';
	import { computed } from 'vue';

	import * as constant from '@/routeConstants';

	export default {
		setup () {
			const router = useRouter();
			const store = useStore();

			const back = () => {
				const prevRouteName = computed(() => store.getters['app/getPreviousRoute']);
				const isAuth = prevRouteName.value.name === constant.ROUTE_AUTH_RETURN;

				(window.history.length > 1 && !isAuth)
					? router.back()
					: router.push('/');
			};

			return {
				back,
			};
		},
	};
</script>
