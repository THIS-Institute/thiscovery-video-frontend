<template>
	<div class="e-container mt-20 xl:mt-24">
		<div class="relative xl:w-20/24 xl:left-2/24">
			<h1 class="e-h2">Book a live interview</h1>

			<p class="mt-2">Pick from the available dates and times</p>

			<hr class="divider mt-5 border-0">

			<div class="relative mt-12">
				<appointment-booker />
			</div>
		</div>
	</div>
</template>

<script>
	import AppointmentBooker from '@/components/block/AppointmentBooker';

	export default {
		components: {
			AppointmentBooker,
		},
	};
</script>
