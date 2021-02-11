<template>
	<template v-if="date && !confirmed">
		<div
			:class="[
				'grid grid-cols-2 items-center justify-around',
				'border border-grey-200 rounded-lg',
				'text-sm lg:text-lg',
			]"
		>
			<div class="flex items-center justify-center space-x-2 px-4 py-5">
				<icon
					class="text-red"
					name="calendar"
				/>

				<p
					class="font-bold whitespace-nowrap"
					v-text="date.date"
				/>
			</div>

			<div class="flex items-center justify-center space-x-2 px-6 py-5 border-l border-grey-200">
				<icon
					class="text-red"
					name="clock"
				/>

				<p
					class="font-bold whitespace-nowrap"
					v-text="`${date.slot}${date.meridiem}`"
				/>
			</div>
		</div>

		<p class="text-sm mt-4.5">You can change or cancel this slot later if you need to.</p>
	</template>

	<div
		v-else-if="!date"
		class="py-7 px-7.5 border border-grey-200 rounded-lg"
	>
		<h1 class="font-bold text-red">Choose a fixed start</h1>

		<p class="text-sm mt-1">Appointments have no duration and last as long as you need them to.</p>
	</div>

	<div
		v-else
		class="py-7 px-7.5 border border-grey-200 rounded-lg"
	>
		<p class="text-sm">Your interview is booked for</p>

		<p
			class="font-bold mt-1"
			v-text="`${date.date}, ${date.slot}${date.meridiem}`"
		/>

		<e-button
			title="Add to calendar"
			icon="calendar"
			class="e-button--red-outline mt-2.5"
			flipped
			pill
		/>
	</div>
</template>

<script>
	export default {
		props: {
			date: {
				type: Object,
				default: null,
			},

			confirmed: Boolean,
		},
	};
</script>
