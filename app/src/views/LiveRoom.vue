<template>
	<div class="flex flex-col min-h-screen h-full bg-grey-400">
		<header
			:class="[
				'absolute top-0 w-full',
				'bg-gradient-to-b from-black-25',
				'py-2.5',
			]"
		>
			<div
				:class="[
					'flex items-center justify-between',
					'max-w-container-xl mx-auto px-2.5',
				]"
			>
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

		<main
			:class="[
				'flex items-center justify-center flex-auto',
				'max-w-container-xl mx-auto px-5',
			]"
		>
			<only-caller />
		</main>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';

	import OnlyCaller from '@/components/interviews/live/OnlyCaller';
	import UserControls from '@/components/interviews/live/UserControls';

	export default {
		components: {
			OnlyCaller,
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
