<template>
	<div class="fixed inset-0 w-full h-full bg-white z-site-navigation lg:hidden">
		<div class="e-container h-full flex items-center">
			<nav>
				<navigation-links mobile-layout />
			</nav>
		</div>
	</div>
</template>

<script>
	import NavigationLinks from './NavigationLinks';

	export default {
		components: { NavigationLinks },
	};
</script>
