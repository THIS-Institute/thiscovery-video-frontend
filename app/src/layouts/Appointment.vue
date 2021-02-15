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

		<main class="md:pb-10 relative z-site-content">
			<div class="e-container mt-6">
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
	import { computed, reactive, toRefs } from 'vue';
	import { useRouter } from 'vue-router';
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
			const router = useRouter();

			const state = reactive({
				offset: null,
			});

			const back = () => window.history.length > 1 ? router.go(-1) : router.push('/');

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
				back,
				nav,
			};
		},
	};
</script>
