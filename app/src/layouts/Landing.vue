<template>
	<div class="relative min-h-screen h-full">
		<div class="e-background e-background--waves" />

		<e-header
			:nav="cNav"
			:nav-active="cNavActive"
			:profile="cProfile"
		/>

		<e-navigation
			v-if="cNavActive"
			:nav="cNav"
			:profile="cProfile"
		/>

		<main class="relative z-site-content">
			<router-view />
		</main>
	</div>
</template>

<script>
	import EHeader from '../components/global/Header';
	import ENavigation from '../components/global/Navigation';

	import { store } from '../store/index';
	import { computed } from 'vue';

	export default {
		components: {
			EHeader,
			ENavigation,
		},

		setup() {
			const cNavActive = computed(() => store.state.app.navActive);
			const cProfile = computed(() => store.state.user.profile);
			const cNav = computed(() => store.state.app.nav);

			return {
				cNavActive,
				cProfile,
				cNav,
			};
		},
	};
</script>
