<template>
	<div class="flex items-start justify-end p-4">
		<div
			:class="[
				'flex items-center space-x-1',
				'px-1.5 py-1 rounded-full',
				'text-white text-sm',
				paused ? 'bg-grey-300' : 'bg-red animate-pulse',
			]"
		>
			<icon
				:name="(paused) ? 'pause' : 'record'"
			/>

			<span
				v-text="(paused) ? 'Paused' : 'Rec'"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			paused: Boolean,
		},
	};
</script>
