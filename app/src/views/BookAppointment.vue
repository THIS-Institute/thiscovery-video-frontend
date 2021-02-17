<template>
	<section class="e-container my-12 md:my-18 xl:my-24">
		<div class="relative xl:w-20/24 xl:left-2/24">
			<h1 class="e-h2">
				Book a live interview
			</h1>

			<p class="mt-2">
				Pick from the available dates and times
			</p>

			<hr class="e-divider mt-5 border-0 xl:hidden">

			<div class="e-content relative mt-12 xl:mt-7">
				<appointment-slots />
			</div>
		</div>
	</section>
</template>

<script>
	import AppointmentSlots from '@/components/appointments/AppointmentSlots';

	export default {
		components: {
			AppointmentSlots,
		},
	};
</script>
