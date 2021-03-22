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
				<interview
					:sections="sections"
					:pre-record="false"
					:loading="false"
					:recording="false"
					:stopped="false"
					:reviewing="true"
				/>
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
				required: true,
			},
		},
	};
</script>
