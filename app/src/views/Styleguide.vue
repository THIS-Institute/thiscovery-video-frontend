<template>
	<div class="e-container bg-grey-200 min-h-screen h-full">
		<component
			:is="`h${index + 1}`"
			v-for="(title, index) in 4"
			:key="index"
			:class="`e-h${index + 1}`"
			v-text="message"
		/>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				:class="[
					'bg-red text-white ring-red',
					'hover:bg-white hover:text-red hover:ring-white',
					'focus:bg-white focus:text-red focus:ring-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				:class="[
					'bg-red text-white ring-red',
					'hover:bg-white hover:text-red hover:ring-white',
					'focus:bg-white focus:text-red focus:ring-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'bg-red text-white ring-red',
					'hover:bg-white hover:text-red hover:ring-white',
					'focus:bg-white focus:text-red focus:ring-white',
				]"
				flipped
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'text-red',
					'hover:text-black',
					'focus:text-black',
				]"
				flipped
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				:class="[
					'bg-white text-red ring-red',
					'hover:bg-red hover:text-white',
					'focus:bg-red focus:text-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				:class="[
					'bg-white text-red ring-red',
					'hover:bg-red hover:text-white',
					'focus:bg-red focus:text-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'bg-white text-red ring-red',
					'hover:bg-red hover:text-white',
					'focus:bg-red focus:text-white',
				]"
				flipped
				pill
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="bg-green text-white"
				:class="[
					'bg-green text-white ring-green',
					'hover:bg-white hover:text-green',
					'focus:bg-white focus:text-green',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				:class="[
					'bg-green text-white ring-green',
					'hover:bg-white hover:text-green',
					'focus:bg-white focus:text-green',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'bg-green text-white ring-green',
					'hover:bg-white hover:text-green',
					'focus:bg-white focus:text-green',
				]"
				flipped
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'text-green',
					'hover:text-black',
					'focus:text-black',
				]"
				flipped
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				:class="[
					'bg-white text-green ring-green',
					'hover:bg-green hover:text-white',
					'focus:bg-green focus:text-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				:class="[
					'bg-white text-green ring-green',
					'hover:bg-green hover:text-white',
					'focus:bg-green focus:text-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'bg-white text-green ring-green',
					'hover:bg-green hover:text-white',
					'focus:bg-green focus:text-white',
				]"
				flipped
				pill
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				:class="[
					'bg-transparent text-white ring-white',
					'hover:bg-white hover:text-black',
					'focus:bg-white focus:text-black',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				:class="[
					'bg-transparent text-white ring-white',
					'hover:bg-white hover:text-black',
					'focus:bg-white focus:text-black',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'bg-transparent text-white ring-white',
					'hover:bg-white hover:text-black',
					'focus:bg-white focus:text-black',
				]"
				flipped
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'text-white',
					'hover:text-black',
					'focus:text-black',
				]"
				flipped
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				class="bg-white text-red"
				:class="[
					'bg-white text-red ring-white',
					'hover:bg-transparent hover:text-white',
					'focus:bg-transparent focus:text-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				:class="[
					'bg-white text-red ring-white',
					'hover:bg-transparent hover:text-white',
					'focus:bg-transparent focus:text-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'bg-white text-red ring-white',
					'hover:bg-transparent hover:text-white',
					'focus:bg-transparent focus:text-white',
				]"
				flipped
				pill
				:small="small"
			/>
		</div>

		<div class="flex space-x-2 mt-10 items-center">
			<e-button
				title="Get involved"
				:class="[
					'bg-transparent text-black ring-black',
					'hover:bg-black hover:text-white',
					'focus:bg-black focus:text-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-right"
				:class="[
					'bg-transparent text-black ring-black',
					'hover:bg-black hover:text-white',
					'focus:bg-black focus:text-white',
				]"
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'bg-transparent text-black ring-black',
					'hover:bg-black hover:text-white',
					'focus:bg-black focus:text-white',
				]"
				flipped
				pill
				:small="small"
			/>

			<e-button
				title="Get involved"
				icon="chevron-left"
				:class="[
					'text-black',
					'hover:text-white',
					'focus:text-white',
				]"
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
