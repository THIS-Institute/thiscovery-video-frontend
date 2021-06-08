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
			const old = computed(() => store.state.user.authAppState);

			const targetPath = old.value.targetUrl;
			const fullUrl = old.value.fullUrl;
			const location = (targetPath) ? targetPath : '/';
			const url = new URL(fullUrl);

			let parameters = {}

			url.searchParams.forEach((value, key) => {
				parameters[key] = value;
			});

			// rather not have to add this here
			if (url.searchParams.has('isInterviewer')) {
				if (url.searchParams.get('isInterviewer') === 'false') {
					store.commit('user/setInterviewerStatus', false);
				} else {
					store.commit('user/setInterviewerStatus', true);
				}
			}

			router.push({
				path: location,
				query: parameters
			});
		}
	}
</script>
