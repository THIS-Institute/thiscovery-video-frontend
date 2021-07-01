<template>
	<div class="relative flex flex-col min-h-screen h-full">
		<div
			:class="[
				'e-background',
				`e-background--${backgroundType}`,
			]"
			:style="{
				height: `${offset}px`,
			}"
		/>

		<app-header
			:nav="nav"
			:nav-active="navActive"
			:profile="profile"
		/>

		<transition
			enter-active-class="transition-opacity ease-out duration-300"
			leave-active-class="transition-opacity ease-in duration-200"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
		>
			<app-navigation
				v-if="navActive"
				:nav="nav"
				:profile="profile"
			/>
		</transition>

		<main class="relative flex-auto z-site-content">
			<back class="mt-6" />

			<router-view />
		</main>
	</div>
</template>

<script>
	import { computed, reactive, toRefs } from 'vue';
	import { useStore } from 'vuex';
	import { useViewport } from '@/composables/useViewport';

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
				default: 'curls',
			},
		},

		setup() {
			const store = useStore();

			const state = reactive({
				offset: null,
			});

			const getCoords = (elem) => {
				const box = elem.getBoundingClientRect();

				const docEl = document.documentElement;
				const scrollTop = window.pageYOffset || docEl.scrollTop || document.body.scrollTop;
				const clientTop = docEl.clientTop || document.body.clientTop || 0;

				const top  = box.top +  scrollTop - clientTop;

				return Math.round(top);
			};

			const onViewportResized = () => {
				const target = document.querySelector(getMediaQuery('xl') ? '.e-content' : '.e-divider');
				const value = getCoords(target) + (getMediaQuery('xl') ? 40 : 0);

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
