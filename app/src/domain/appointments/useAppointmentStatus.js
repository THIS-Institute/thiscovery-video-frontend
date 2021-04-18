import { computed } from 'vue';
import { useStore } from 'vuex';

export function useAppointmentStatus() {
	const store = useStore();

	return {
		isStatusReady: computed(() => store.getters['appointments/isStatusReady']),
		isStatusBooked: computed(() => store.getters['appointments/isStatusBooked']),
		isStatusRescheduling: computed(() => store.getters['appointments/isStatusRescheduling']),
		isStatusCancelled: computed(() => store.getters['appointments/isStatusCancelled']),
	}
}
