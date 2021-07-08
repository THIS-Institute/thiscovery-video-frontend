<template>
	<div class="addeventatc addeventatc--custom">
		<div
			:class="[
				'relative e-button e-button--red-outline',
				'transition-colors duration-300 focus:outline-none',
				'px-6 py-4 rounded-full border-2 leading-snug',
				'flex items-center space-x-2.5',
			]"
		>
			<icon name="calendar" />

			<span>Add to calendar</span>
		</div>
	</div>
</template>
