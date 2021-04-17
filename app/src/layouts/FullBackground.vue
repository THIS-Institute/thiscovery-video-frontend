<template>
	<div class="relative flex flex-col min-h-screen h-full">
		<div
			:class="[
				'e-background',
				`e-background--${backgroundType}`,
			]"
		/>

		<app-header
			v-if="hasNav"
			:nav="nav"
			:nav-active="navActive"
		/>

		<app-navigation
			v-if="navActive && hasNav"
			:nav="nav"
		/>

		<main class="relative flex-auto z-site-content">
			<div
				v-if="hasBack"
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
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';

	import AppHeader from '@/components/app/AppHeader';
	import AppNavigation from '@/components/app/AppNavigation';

	export default {
		components: {
			AppHeader,
			AppNavigation,
		},

		props: {
			backgroundType: {
				type: String,
				default: 'waves',
			},
			hasNav: {
				type: Boolean,
				default: true,
			},
			hasBack: {
				type: Boolean,
				default: true,
			},
		},

		setup() {
			const store = useStore();
			const router = useRouter();
			const back = () => window.history.length > 1 ? router.go(-1) : router.push('/');

			const navActive = computed(() => store.state.app.navActive);
			const nav = computed(() => store.state.app.nav);

			return {
				navActive,
				back,
				nav,
			};
		},
	};
</script>
