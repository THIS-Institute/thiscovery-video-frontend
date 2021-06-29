<template>
	<icon-text
		class="e-h3"
		:text="message('preSettings.fix')"
		:icon="{
			name: 'info',
		}"
	/>

	<hr class="border-opacity-25 border-grey-400 mt-5">

	<div class="flex flex-col mt-6 max-h-96 overflow-scroll pr-2">
		<h2 class="e-h4">
			If you're not using additional peripherals:
		</h2>

		<ul class="list-disc text-base space-y-2 mt-2">
			<li class="ml-6">
				Make sure the computer has a mic/webcam. Most current laptops have a webcam and mic, but desktops usually don't.
			</li>

			<li class="ml-6">
				Check the computer settings to make sure the camera and sound settings are correct.
			</li>

			<li class="ml-6">
				For the mic, check if the input sensitivity is too low or too high which could cause issues.
			</li>

			<li class="ml-6">
				Restart the computer.
			</li>

			<li class="ml-6">
				For PCs/Windows, check the drivers to see if they are installed and updated.
			</li>

			<li class="ml-6">
				For Macs, make sure your operating system is updated.
			</li>
		</ul>

		<h2 class="e-h4 mt-4">
			If you are using peripherals (such as a headset or external camera):
		</h2>

		<ul class="list-disc text-base space-y-2 mt-2">
			<li class="ml-6">
				Check the computer settings to make sure the camera and sound settings are using the correct source.
			</li>

			<li class="ml-6">
				If there are multiple devices plugged in, there's a chance the webcam also has a built in mic and the settings are set to the default input and not to the one you require.
			</li>

			<li class="ml-6">
				Check the input sensitivity of your mic to ensure it is not too low or too high which could cause issues.
			</li>

			<li class="ml-6">
				Check the settings in the application to make sure the correct peripherals are selected.
			</li>

			<li class="ml-6">
				Also check to see if anything is muted in either the application or computer settings.
			</li>

			<li class="ml-6">
				Check the sound level as it can reset for peripherals back down to 0 when plugged in.
			</li>

			<li class="ml-6">
				If you are using a headset/mic, there may be physical buttons on the device that also mute sound output, mic input and overall sound control. (This will vary by device.)
			</li>

			<li class="ml-6">
				Unplug the peripheral/s and plug them back in.
			</li>

			<li class="ml-6">
				Try another port on the computer if available.
			</li>

			<li class="ml-6">
				Refresh your browser.
			</li>
		</ul>
	</div>

	<div class="flex items-center justify-center space-x-4 mt-5">
		<x-button
			title="Close"
			class="e-button--red-outline"
			small
			type="pill"
			@click="$emit('close')"
		/>
	</div>
</template>

<script>
	import messages from '@/messages';
	import { useMessages } from '@/composables/useMessages';

	export default {
		emits: [
			'close',
		],

		setup() {
			const { message } = useMessages(messages);

			return {
				message,
			};
		},
	};
</script>
