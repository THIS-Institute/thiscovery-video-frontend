<template>
	<section class="e-container flex min-h-screen h-full md:items-center">
		<div class="grid grid-cols-12 w-full gap-5 mt-12 md:my-18 xl:my-24">
			<div
				:class="[
					'col-span-12',
					'md:col-span-10 md:col-start-2',
					'xl:col-span-8 xl:col-start-3',
				]"
			>
				<interview :sections="sections" />
			</div>
		</div>
	</section>
</template>

<script>
	import Interview from '@/components/interviews/solo/Interview';

	export default {
		components: {
			Interview,
		},

		props: {
			sections: {
				type: Array,
				default: () => [
					{
						title: "Introductory questions",
						questions: [
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of obstetrics.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of question 2.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of question 3.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
						],
					},
					{
						title: "Secondary questions",
						questions: [
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of obstetrics.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of question 2.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
							{
								title: "Please spend a couple of minutes describing your professional experience in the field of question 3.",
								description: "Think about your past experiences in relevant roles you duis mollis, est non commando luctus, nisi erat prttitor ligula, egat lacinia odio sem nec elit. Nulla vitae elit livero, a pharetra augue.",
							},
						],
					},
				],
			},
		},
	};
</script>
