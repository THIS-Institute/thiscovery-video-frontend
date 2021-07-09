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

		<transition
			enter-active-class="transition-opacity ease-out duration-300"
			leave-active-class="transition-opacity ease-in duration-200"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
		>
			<app-navigation
				v-if="navActive && hasNav"
				:nav="nav"
			/>
		</transition>

		<main class="relative flex-auto z-site-content">
			<back
				v-if="hasBack"
				class="mt-6"
			/>

			<router-view />

			<div class="e-container">
				<div class="flex space-x-4">
					<x-button
						title="Leave interview"
						class="e-button--red"
						type="pill"
						@click="openModal(modals.leave, leaveCallbacks)"
					/>

					<x-button
						title="Retake"
						class="e-button--red-outline"
						type="pill"
						@click="openModal(modals.retake)"
					/>

					<x-button
						title="Join by phone"
						class="e-button--red"
						type="pill"
						@click="openModal(modals.phone)"
					/>

					<x-button
						title="How to fix this"
						class="e-button--red-outline"
						type="pill"
						@click="openModal(modals.troubleshoot)"
					/>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';
	import modals from '@/modals';

	import AppHeader from '@/domain/app/AppHeader';
	import AppNavigation from '@/domain/app/AppNavigation';
	import Back from '@/components/Back';

	export default {
		components: {
			AppHeader,
			AppNavigation,
			Back,
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

			const navActive = computed(() => store.state.app.navActive);
			const nav = computed(() => store.state.app.nav);

			const openModal = (options, callbacks) => store.dispatch('app/openModal', { ...options, callbacks });

			const onLeave = () => console.log('leave');
			const leaveCallbacks = {
				confirm: () => onLeave(),
			};

			return {
				modals,
				leaveCallbacks,
				openModal,
				navActive,
				nav,
			};
		},
	};
</script>
