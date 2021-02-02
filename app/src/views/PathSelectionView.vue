<template>
	<div class="e-container">
		<component
			:is="`h${index + 1}`"
			v-for="(title, index) in 4"
			:key="index"
			:class="`e-h${index + 1}`"
			v-text="message"
		/>
	</div>
</template>

<script>
	import { reactive, toRefs } from 'vue';

	export default {
		setup () {
			const state = reactive({
				message: "This is a new way of doing research",
			});
		
			return {
				...toRefs(state),
			};
		},
	};
</script>
