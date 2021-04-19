<template>
	<div />
</template>

<script>
	import { computed } from 'vue';
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex';

	export default {
		setup() {
			const router = useRouter();
			const store = useStore();

			const targetUrl = computed(() => store.getters['user/getAuthTargetUrl']);
			const location = (targetUrl.value) ? targetUrl.value : '/';

			router.push(location);
		}
	}
</script>
