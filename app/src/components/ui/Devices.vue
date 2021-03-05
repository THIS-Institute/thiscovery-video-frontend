<template>
	<ul
		:class="[
			'flex flex-col space-y-2',
			'rounded-lg p-4',
			'border border-opacity-25 border-grey-400',
		]"
	>
		<li
			v-for="(device, index) in [camera, microphone]"
			:key="index"
		>
			<icon-text
				:text="device.title"
				text-class="text-sm font-bold"
				:icon="{
					name: device.enabled ? 'check' : 'close',
					size: 'w-4 h-4 text-white',
					bg: device.enabled ? 'bg-green' : 'bg-red',
				}"
			/>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			camera: {
				type: Object,
				required: true,
			},

			microphone: {
				type: Object,
				required: true,
			},
		},
	};
</script>
