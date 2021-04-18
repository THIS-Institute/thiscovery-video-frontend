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
					name: device.available ? 'check' : 'close',
					size: 'w-4 h-4 text-white',
					bg: device.available ? 'bg-green' : 'bg-red',
				}"
			/>
		</li>
	</ul>
</template>

<script>
	import { reactive } from 'vue';
	import { useDevices } from '@/domain/interviews/settings/useDevices';

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

				if (!device.available) {
					return `No ${device.type.toLowerCase()} available`;
				}

				return `${device.type}: ${device.label} is availble`;
			};

			const devices = reactive({
				camera: {
					type: 'Camera',
					label: activeCameraName,
					available: hasCamera,
				},

				microphone: {
					type: 'Microphone',
					label: activeMicrophoneName,
					available: hasMicrophone,
				},
			});

			return {
				devices,
				getDeviceText,
			};
		},
	};
</script>
