<template>
	<div class="relative min-h-screen h-full">
		<div class="e-background e-background--scratches" />

		<e-header
			v-if="!hideNav"
			:nav="nav"
			:nav-active="navActive"
			:profile="profile"
		/>

		<e-navigation
			v-if="navActive && !hideNav"
			:nav="nav"
			:profile="profile"
		/>

		<main class="md:pb-10 relative z-site-content">
			<div
				v-if="!hideNav"
				class="e-container mt-6"
			>
				<e-button
					title="Back"
					icon="chevron-left"
					class="text-red hover:text-black active:text-black"
					flipped
					@click="back"
				/>
			</div>

			<router-view />
		</main>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';
	import { store } from '@/store/index';

	import EHeader from '@/components/global/Header';
	import ENavigation from '@/components/global/Navigation';

	export default {
		components: {
			EHeader,
			ENavigation,
		},

		props: {
			hideNav: Boolean,
		},

		setup() {
			const router = useRouter();
			const back = () => window.history.length > 1 ? router.go(-1) : router.push('/');

			const navActive = computed(() => store.state.app.navActive);
			const profile = computed(() => store.state.user.profile);
			const nav = computed(() => store.state.app.nav);

			return {
				navActive,
				profile,
				back,
				nav,
			};
		},
	};
</script>
