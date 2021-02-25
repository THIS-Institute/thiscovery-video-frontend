<template>
	<div class="flex flex-col min-h-screen h-full bg-grey-400">
		<header
			:class="[
				'absolute top-0 w-full',
				'bg-gradient-to-b from-black-25',
				'p-2.5 pl-4 z-site-header',
			]"
		>
			<div class="flex items-center justify-between">
				<e-button
					title="Leave interview"
					icon="chevron-left"
					class="e-button--white-outline"
					flipped
					small
					pill
					@click="back"
				/>

				<user-controls />
			</div>
		</header>

		<main class="flex items-center justify-center flex-auto z-site-content">
			<only-caller v-if="false" />

			<participant v-else />
		</main>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';

	import OnlyCaller from '@/components/interviews/live/OnlyCaller';
	import Participant from '@/components/interviews/live/Participant';
	import UserControls from '@/components/interviews/live/UserControls';

	export default {
		components: {
			OnlyCaller,
			Participant,
			UserControls,
		},

		setup() {
			const router = useRouter();
			const back = () => window.history.length > 1 ? router.go(-1) : router.push('/');

			const store = useStore();
			const profile = computed(() => store.state.user.profile);

			return {
				profile,
				back,
			};
		},
	};
</script>
