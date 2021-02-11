<template>
	<div class="relative min-h-screen h-full">
		<div class="e-background e-background--waves" />

		<e-header
			:nav="nav"
			:nav-active="navActive"
			:profile="profile"
		/>

		<e-navigation
			v-if="navActive"
			:nav="nav"
			:profile="profile"
		/>

		<main class="pb-10 relative z-site-content">
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
			const navActive = computed(() => store.state.app.navActive);
			const profile = computed(() => store.state.user.profile);
			const nav = computed(() => store.state.app.nav);

			return {
				navActive,
				profile,
				nav,
			};
		},
	};
</script>
