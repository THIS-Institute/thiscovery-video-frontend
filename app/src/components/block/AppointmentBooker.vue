<template>
	<section
		:class="[
			'grid grid-cols-10 gap-5 items-center pb-16',
			'md:pb-0',
			'xl:rounded-lg xl:bg-white',
			'xl:px-18 xl:py-8',
		]"
	>
		<div class="col-span-10 md:col-span-4">
			<div class="flex items-center space-x-4">
				<div class="flex items-center justify-center rounded-full p-3 bg-pink">
					<icon
						name="camera"
						class="e-h3"
					/>
				</div>

				<h1 class="e-h3">Live interview</h1>
			</div>

			<h1 class="e-h2 mt-6">Suggest recommendations for good practice</h1>

			<div class="mt-5 py-7 px-7.5 border border-grey-200 rounded-lg">
				<h1 class="font-bold text-red">Choose a fixed start</h1>

				<p class="text-sm mt-1">Appointments have no duration and last as long as you need them to.</p>
			</div>

			<e-button
				title="Book appointment"
				icon="chevron-right"
				class="e-button--red mt-5 hidden md:inline-block"
				:disabled="true"
				pill
			/>
		</div>

		<div class="col-span-10 md:col-span-6 md:col-start-5">
			<date-picker />
		</div>
	</section>

	<div class="sticky bottom-0 bg-white p-5 -mx-gutter shadow-sticky md:hidden">
		<e-button
			title="Book appointment"
			icon="chevron-right"
			class="e-button--red"
			:disabled="true"
			pill
		/>
	</div>
</template>

<script>
	import DatePicker from '@/components/block/DatePicker';

	export default {
		components: {
			DatePicker,
		},
	};
</script>
