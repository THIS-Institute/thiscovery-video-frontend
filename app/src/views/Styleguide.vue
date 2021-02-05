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

			<p class="mt-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi harum doloremque, cumque quas accusantium blanditiis officia saepe fugiat reprehenderit sunt cum dignissimos natus! Quae facere molestias illum non cumque ex!</p>
		</div>

		<!-- Buttons -->
		<div class="mt-10">
			<div class="flex space-x-2 items-center">
				<e-button
					title="Get involved"
					class="e-button--red"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-right"
					class="e-button--red"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="e-button--red"
					flipped
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="text-red hover:text-black focus:text-black"
					flipped
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<e-button
					title="Get involved"
					class="e-button--red-outline"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-right"
					class="e-button--red-outline"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="e-button--red-outline"
					flipped
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<e-button
					title="Get involved"
					class="e-button--green"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-right"
					class="e-button--green"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="e-button--green"
					flipped
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="text-green hover:text-black focus:text-black"
					flipped
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<e-button
					title="Get involved"
					class="e-button--green-outline"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-right"
					class="e-button--green-outline"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="e-button--green-outline"
					flipped
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<e-button
					title="Get involved"
					class="e-button--white-outline"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-right"
					class="e-button--white-outline"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="e-button--white-outline"
					flipped
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="text-white hover:text-black focus:text-black"
					flipped
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<e-button
					title="Get involved"
					class="e-button--white"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-right"
					class="e-button--white"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="e-button--white"
					flipped
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<e-button
					title="Get involved"
					class="e-button--black-outline"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-right"
					class="e-button--black-outline"
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="e-button--black-outline"
					flipped
					pill
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="Get involved"
					icon="chevron-left"
					class="text-black hover:text-red focus:text-red"
					flipped
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>

			<div class="flex space-x-2 mt-10 items-center">
				<e-button
					title="07:45am"
					class="e-button--time"
					time
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="07:45am"
					class="e-button--time"
					time
					:small="button.small"
					:disabled="button.disabled"
				/>

				<e-button
					title="07:45am"
					class="e-button--time"
					flipped
					time
					:small="button.small"
					:disabled="button.disabled"
				/>
			</div>

			<div class="flex items-center space-x-2 mt-5">
				<label for="small">Small buttons</label>

				<input
					type="checkbox"
					name="small"
					v-model="button.small"
				>
			</div>

			<div class="flex items-center space-x-2 mt-2">
				<label for="disabled">Disabled buttons</label>

				<input
					type="checkbox"
					name="disabled"
					v-model="button.disabled"
				>
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
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';

	export default {
		setup () {
			const state = reactive({
				message: "This is a new way of doing research",
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
				...toRefs(state),
			};
		},
	};
</script>
