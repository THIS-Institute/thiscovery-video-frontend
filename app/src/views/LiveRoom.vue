<template>
	<div class="flex flex-col min-h-screen h-full bg-grey-400">
		<main class="flex items-center justify-center flex-auto z-site-content">
			<participant v-if="interviewer" />

			<only-caller v-else />

			<div class="flex flex-col absolute inset-0 w-full h-full">
				<div class="p-2.5 pl-4 w-full bg-gradient-to-b from-black-25">
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
				</div>

				<div
					v-if="interviewer"
					class="flex items-end justify-between mt-auto p-2.5 pl-4"
				>
					<p
						class="e-h4"
						v-text="interviewer.name"
					/>

					<div
						v-if="showQuestions"
						class="ml-auto p-8 bg-white rounded-lg max-w-xs"
					>
						<div class="flex items-center justify-between space-x-4">
							<icon-text
								text="Current question"
								:icon="{
									name: 'question',
									size: 'w-6 h-6',
								}"
							/>

							<icon
								name="chevron-right"
								class="transform rotate-90 text-red"
							/>
						</div>

						<p
							class="mt-7"
							v-text="question"
						/>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import { reactive, toRefs, computed } from 'vue';
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

			const state = reactive({
				interviewer: {
					name: "Cameron Williamson",
				},
				showQuestions: true,
				question: 'Please spend a couple of minutes describing your professional experience in the field of obstetrics.',
			});

			return {
				...toRefs(state),
				profile,
				back,
			};
		},
	};
</script>
