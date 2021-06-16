<template>
	<div
		class="e-container min-h-screen h-full"
		:class="button.disabled ? 'bg-white' : 'bg-grey-200'"
	>
		<!-- Logo -->
		<div class="max-w-logo xl:max-w-logo-xl">
			<placeholder ratio="pt-logo">
				<icon
					class="text-red"
					size="w-full h-full"
					name="logo"
				/>
			</placeholder>

			<placeholder ratio="pt-logo">
				<icon
					class="text-white"
					size="w-full h-full"
					name="logo"
				/>
			</placeholder>
		</div>

		<!-- Typography -->
		<div class="mt-10">
			<component
				:is="`h${index + 1}`"
				v-for="(title, index) in 4"
				:key="index"
				:class="`e-h${index + 1}`"
				v-text="message"
			/>

			<p class="mt-5">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi harum doloremque, cumque quas accusantium blanditiis officia saepe fugiat reprehenderit sunt cum dignissimos natus! Quae facere molestias illum non cumque ex!
			</p>
		</div>

		<!-- Buttons -->
		<div class="mt-10">
			<div class="flex items-center space-x-2">
				<label for="small">Small buttons</label>

				<input
					v-model="button.small"
					type="checkbox"
					name="small"
				>
			</div>

			<div class="flex items-center space-x-2 mt-2">
				<label for="disabled">Disabled buttons</label>

				<input
					v-model="button.disabled"
					type="checkbox"
					name="disabled"
				>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<x-button
					class="e-button--red"
					title="Get involved"
					type="pill"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					class="e-button--red"
					title="Get involved"
					type="pill"
					icon="chevron-right"
					:small="button.small"
				/>

				<x-button
					class="e-button--red"
					title="Get involved"
					type="pill"
					icon="chevron-left"
					flipped
					:small="button.small"
				/>

				<x-button
					title="Get involved"
					class="text-red hover:text-black focus:text-black"
					icon="chevron-left"
					type="subtle"
					flipped
					:small="button.small"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<x-button
					class="e-button--red-outline"
					title="Get involved"
					type="pill"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					class="e-button--red-outline"
					title="Get involved"
					type="pill"
					icon="chevron-right"
					:small="button.small"
				/>

				<x-button
					class="e-button--red-outline"
					title="Get involved"
					type="pill"
					icon="chevron-left"
					flipped
					:small="button.small"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<x-button
					class="e-button--green"
					title="Get involved"
					type="pill"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					class="e-button--green"
					title="Get involved"
					type="pill"
					icon="chevron-right"
					:small="button.small"
				/>

				<x-button
					class="e-button--green"
					title="Get involved"
					type="pill"
					icon="chevron-left"
					flipped
					:small="button.small"
				/>

				<x-button
					title="Get involved"
					class="text-green hover:text-black focus:text-black"
					icon="chevron-left"
					type="subtle"
					flipped
					:small="button.small"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<x-button
					class="e-button--green-outline"
					title="Get involved"
					type="pill"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					class="e-button--green-outline"
					title="Get involved"
					type="pill"
					icon="chevron-right"
					:small="button.small"
				/>

				<x-button
					class="e-button--green-outline"
					title="Get involved"
					type="pill"
					icon="chevron-left"
					flipped
					:small="button.small"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<x-button
					class="e-button--white-outline"
					title="Get involved"
					type="pill"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					class="e-button--white-outline"
					title="Get involved"
					type="pill"
					icon="chevron-right"
					:small="button.small"
				/>

				<x-button
					class="e-button--white-outline"
					title="Get involved"
					type="pill"
					icon="chevron-left"
					flipped
					:small="button.small"
				/>

				<x-button
					title="Get involved"
					class="text-white hover:text-black focus:text-black"
					icon="chevron-left"
					type="subtle"
					flipped
					:small="button.small"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<x-button
					class="e-button--white"
					title="Get involved"
					type="pill"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					class="e-button--white"
					title="Get involved"
					type="pill"
					icon="chevron-right"
					:small="button.small"
				/>

				<x-button
					class="e-button--white"
					title="Get involved"
					type="pill"
					icon="chevron-left"
					flipped
					:small="button.small"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<x-button
					class="e-button--black-outline"
					title="Get involved"
					type="pill"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					class="e-button--black-outline"
					title="Get involved"
					type="pill"
					icon="chevron-right"
					:small="button.small"
				/>

				<x-button
					class="e-button--black-outline"
					title="Get involved"
					type="pill"
					icon="chevron-left"
					flipped
					:small="button.small"
				/>

				<x-button
					title="Get involved"
					class="text-black hover:text-red focus:text-red"
					icon="chevron-left"
					type="subtle"
					flipped
					:small="button.small"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<x-button
					sr-only="Thursday 2nd December"
					title="07:45am"
					type="time"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					sr-only="Friday 3rd December"
					title="07:45am"
					type="time"
					:small="button.small"
					:disabled="button.disabled"
				/>

				<x-button
					sr-only="Monday 6th December"
					title="07:45am"
					type="time"
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>
		</div>

		<!-- Icons -->
		<div class="mt-10">
			<div class="grid grid-cols-6 gap-4 max-w-2xl e-h1">
				<div
					v-for="(icon, index) in icons"
					:key="index"
				>
					<icon :name="icon" />
				</div>

				<div>
					<icon :names="['camera', 'camera-strike']" />
				</div>

				<div>
					<icon :names="['audio-base', 'audio-sound']" />
				</div>

				<div>
					<icon :names="['audio-base', 'audio-off']" />
				</div>
			</div>
		</div>

		<!-- Icon text -->
		<div class="flex flex-col mt-10 space-y-4">
			<icon-text
				text="Current question"
				:icon="{
					name: 'question',
					size: 'w-6 h-6',
					bg: false ? 'bg-pink' : 'bg-grey-200',
				}"
			/>

			<icon-text
				class="e-h4"
				text="Self record"
				:icon="{
					name: 'video',
				}"
			/>

			<icon-text
				class="e-h2"
				text="Self record"
				:icon="{
					name: 'video',
				}"
			/>

			<icon-text
				class="e-h3"
				text="Live interview"
				:icon="{
					name: 'camera',
				}"
			/>
		</div>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';
	import XButton from '@/components/xbutton';
	import Tooltip from '@/components/Tooltip.vue';

	export default {
		components: {
			XButton,
			Tooltip,
		},

		setup() {
			const data = reactive({
				message: 'This is a new way of doing research',

				button: {
					small: false,
					disabled: false,
				},

				icons: [
					'video',
					'check',
					'chevron-left',
					'chevron-right',
					'calendar',
					'clock',
					'close',
					'edit',
					'phone',
					'info',
					'save',
					'play',
					'retake',
					'question',
					'pause',
					'scribe',
					'settings',
					'camera',
				],
			});

			return {
				...toRefs(data),
			};
		},
	};
</script>
