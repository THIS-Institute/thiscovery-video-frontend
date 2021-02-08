<template>
	<div class="relative min-h-screen h-full">
		<div
			class="e-background e-background--curls"
		/>

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

		<main class="relative z-site-content">
			<router-view />
		</main>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { store } from '@/store/index';
	import { useViewport } from '@/composables/useViewport';

	import EHeader from '@/components/global/Header';
	import ENavigation from '@/components/global/Navigation';

	export default {
		components: {
			EHeader,
			ENavigation,
		},

		setup() {
			const navActive = computed(() => store.state.app.navActive);
			const profile = computed(() => store.state.user.profile);
			const nav = computed(() => store.state.app.nav);

			const onViewportResized = () => {
				console.log('resized');
				console.log(getMediaQuery('md'));
			};

			const { getMediaQuery } = useViewport(onViewportResized);

			return {
				navActive,
				profile,
				nav,
			};
		},
	};
</script>
