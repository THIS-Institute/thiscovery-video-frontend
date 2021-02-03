<template>
	<div class="e-container bg-grey-200 min-h-screen h-full">
		<div class="max-w-logo">
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

		<div class="mt-10">
			<component
				:is="`h${index + 1}`"
				v-for="(title, index) in 4"
				:key="index"
				:class="`e-h${index + 1}`"
				v-text="message"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="e-button--red"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				class="e-button--red"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="e-button--red"
				flipped
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="text-red hover:text-black focus:text-black"
				flipped
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="e-button--red-outline"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				class="e-button--red-outline"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="e-button--red-outline"
				flipped
				pill
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="e-button--green"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				class="e-button--green"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="e-button--green"
				flipped
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="text-green hover:text-black focus:text-black"
				flipped
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="e-button--green-outline"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				class="e-button--green-outline"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="e-button--green-outline"
				flipped
				pill
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="e-button--white-outline"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				class="e-button--white-outline"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="e-button--white-outline"
				flipped
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="text-white hover:text-black focus:text-black"
				flipped
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="e-button--white"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				class="e-button--white"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="e-button--white"
				flipped
				pill
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="e-button--black-outline"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				class="e-button--black-outline"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="e-button--black-outline"
				flipped
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				class="text-black hover:text-red focus:text-red"
				flipped
				:small="small"
			/>
		</div>

		<div class="flex items-center space-x-2 mt-5">
			<label for="small">Small buttons</label>

			<input
				type="checkbox"
				name="small"
				v-model="small"
			>
		</div>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';

	export default {
		setup () {
			const state = reactive({
				message: "This is a new way of doing research",
				small: false,
			});
		
			return {
				...toRefs(state),
			};
		},
	};
</script>
