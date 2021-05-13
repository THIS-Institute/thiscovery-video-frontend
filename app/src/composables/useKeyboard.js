import { onMounted } from 'vue';

export function useEscKey (callbackFn) {
	onMounted(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') callbackFn();
		});
	});
}
