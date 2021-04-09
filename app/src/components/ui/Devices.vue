<template>
	<ul
		:class="[
			'flex flex-col space-y-2',
			'rounded-lg p-4',
			'border border-opacity-25 border-grey-400',
		]"
	>
		<li
			v-for="(device, index) in devices"
			:key="index"
		>
			<icon-text
				:text="getDeviceText(device)"
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
	import { reactive } from 'vue';
	import { useDevices } from '@/components/interviews/settings/useDevices';

	export default {
		setup() {
			const {
				declinedPermission,
				activeCameraName,
				activeMicrophoneName,
				hasCamera,
				hasMicrophone,
			} = useDevices();

			const getDeviceText = (device) => {
				if (declinedPermission.value) {
					return `You declined permissions for ${device.type.toLowerCase()}`;
				}

				if (!device.enabled) {
					return `No ${device.type.toLowerCase()} available`;
				}

				return `${device.type}: ${device.label} is availble`;
			};

			const devices = reactive({
				camera: {
					type: 'Camera',
					label: activeCameraName,
					enabled: hasCamera,
				},

				microphone: {
					type: 'Microphone',
					label: activeMicrophoneName,
					enabled: hasMicrophone,
				},
			});

			return {
				devices,
				getDeviceText,
			};
		},
	};
</script>
