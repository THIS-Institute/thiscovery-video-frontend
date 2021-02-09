<template>
	<div class="relative min-h-screen h-full">
		<div
			class="e-background e-background--curls"
			:style="{
				height: `${offset}px`,
			}"
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
	import { computed, reactive, toRefs } from 'vue';
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
			const state = reactive({
				offset: null,
			});

			const onViewportResized = () => {
				const target = document.querySelector(getMediaQuery('xl') ? '.e-content' : '.e-divider');
				const value = target.getBoundingClientRect().top + (getMediaQuery('xl') ? 40 : 0);

				state.offset = value;
			};

			const { getMediaQuery } = useViewport(onViewportResized);

			const navActive = computed(() => store.state.app.navActive);
			const profile = computed(() => store.state.user.profile);
			const nav = computed(() => store.state.app.nav);

			return {
				...toRefs(state),
				navActive,
				profile,
				nav,
			};
		},
	};
</script>
