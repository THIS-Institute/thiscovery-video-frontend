<template>
	<div class="flex flex-col min-h-screen h-full bg-grey-400">
		<header
			:class="[
				'absolute top-0 w-full',
				'bg-gradient-to-b from-black-25',
				'py-2 md:py-4 xl:py-8',
			]"
		>
			<div class="e-container flex items-center justify-between">
				<e-button
					title="Leave interview"
					icon="chevron-left"
					class="e-button--white-outline"
					flipped
					pill
					@click="back"
				/>
			</div>
		</header>

		<main class="e-container flex items-center justify-center flex-auto">
			<section class="rounded-lg bg-white px-8 py-16">
				<div class="flex flex-col items-center justify-center text-center max-w-xs">
					<div class="w-32 h-32 rounded-full bg-yellow" />

					<h2 class="e-h3 mt-7">
						You're the first here
					</h2>

					<p class="mt-1">
						Please wait a moment while others join the call…
					</p>
				</div>
			</section>
		</main>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from 'vuex';
	import { useRouter } from 'vue-router';

	export default {
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
