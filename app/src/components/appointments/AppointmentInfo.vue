<template>
	<div class="bg-grey-100 rounded-lg px-12 py-14">
		<h3 class="e-h3">
			What happens next?
		</h3>

		<p class="mt-5">
			You will receive confirmation and reminder emails. When it's nearly time for your appointment, click the link in your email to enter the meeting room.
		</p>

		<div class="flex flex-col items-start space-y-5 mt-10">
			<e-button
				title="Reschedule appointment"
				icon="edit"
				class="text-red hover:text-black focus:text-black"
				flipped
			/>

			<e-button
				title="Cancel appointment"
				icon="close"
				class="text-red hover:text-black focus:text-black"
				flipped
			/>
		</div>

		<e-button
			title="Back to project page"
			class="e-button--red mt-10"
			url="/"
			pill
		/>
	</div>
</template>
