<template>
	<div
		class="w-7"
		:class="{ 'listening': isSpeaking }"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 36 26"
		>
			<g>
				<rect
					v-for="(rect, index) in 5"
					:id="`wave-${index}`"
					:key="index"
					fill="currentColor"
					:x="8 * index"
					y="2"
					width="4"
					height="2"
					rx="2"
					ry="2"
				/>
			</g>
		</svg>
	</div>
</template>

<script>
	export default {
		props: {
			isSpeaking: Boolean,
		},
	};
</script>

<style scoped>
	rect {
		height: 4px;
		y: 11px;
	}

	.listening rect {
		animation-name: pulse;
		animation-duration: 0.6s;
		animation-iteration-count: infinite;
	}

	#wave-1 {
		animation-delay: 0.2s
	}

	#wave-2 {
		animation-delay: 1s
	}

	#wave-3 {
		animation-delay: 0.6s
	}

	#wave-5 {
		animation-delay: 0.4s;
	}

	#wave-4 {
		animation-delay: 0.8s;
	}

	@keyframes pulse {
		0%, 100% {
			height: 4px;
			y: 11px;
		}
		50% {
			height: 26px;
			y: 0px;
		}
	}
</style>
