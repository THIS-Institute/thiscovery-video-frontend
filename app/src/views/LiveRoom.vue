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

					<question-wrapper
						:questions="questions"
						:participant="false"
					/>
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
	import QuestionWrapper from '@/components/interviews/live/QuestionWrapper';

	export default {
		components: {
			OnlyCaller,
			Participant,
			UserControls,
			QuestionWrapper,
		},

		props: {
			questions: {
				type: Array,
				default: () => [
					{
						text: '1 Please spend a couple of minutes describing your professional experience in the field of obstetrics.',
					},
					{
						text: '2 Please spend a couple of minutes describing your professional experience in the field of obstetrics.',
					},
					{
						text: '3 Please spend a couple of minutes describing your professional experience in the field of obstetrics.',
					},
					{
						text: '4 Please spend a couple of minutes describing your professional experience in the field of obstetrics.',
					},
					{
						text: '5 Please spend a couple of minutes describing your professional experience in the field of obstetrics.',
					},
				],
			},
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
			});

			return {
				...toRefs(state),
				profile,
				back,
			};
		},
	};
</script>
