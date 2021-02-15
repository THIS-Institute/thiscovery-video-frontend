<template>
	<div class="e-container mt-20 xl:mt-24">
		<div class="relative xl:w-20/24 xl:left-2/24">
			<h1 class="e-h2">
				Choose how to take part
			</h1>

			<p class="mt-2">
				Would you like to have a conversation or record yourself?
			</p>

			<div class="relative grid grid-cols-10 gap-4 mt-7">
				<selection-card
					v-for="(path, index) in paths"
					:key="index"
					class="col-span-10 sm:col-span-8 md:col-span-5 xl:col-span-4"
					v-bind="path"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import SelectionCard from '@/components/block/SelectionCard';

	export default {
		components: {
			SelectionCard,
		},

		setup () {
			const paths = [
				{
					icon: 'camera',
					title: 'Live interview',
					content: 'We\'re sorry, but a live interview is not available for this task.',
					unavailable: true,
				},
				// {
				// 	icon: 'camera',
				// 	title: 'Live interview',
				// 	content: 'Book an online meeting with a member of the online reasearch team',
				// 	items: [
				// 		'Speak directly with a researcher',
				// 		'At a time that suits you',
				// 		'Video or audio-only call',
				// 	],
				// 	cta: {
				// 		title: 'Make an appointment',
				// 		url: '#',
				// 	},
				// 	tutorial: {
				// 		title: 'Want to know more?',
				// 		cta: {
				// 			title: 'See how an appointment works',
				// 			url: '#',
				// 		},
				// 	},
				// },
				{
					icon: 'video',
					title: 'Self record',
					content: 'Record your responses privately and in your own time',
					items: [
						'Start right away or whenever you like',
						'Read and respond at your leisure',
						'Pause and resume on any device',
					],
					cta: {
						title: 'Record responses',
						url: '#',
					},
					tutorial: {
						title: 'Want to know more?',
						cta: {
							title: 'See how self-record works',
							url: '#',
						},
					},
				},
			];
		
			return {
				paths,
			};
		},
	};
</script>
