import { computed } from 'vue';
import { store } from '@/store';
import { ROUTE_APPOINTMENT_STATUS } from '@/routeConstants';

export const hasAppointmentGuard = (to, from, next) => {
    const isStatusBooked = computed(() => store.getters['appointments/isStatusBooked']);
    
    if (isStatusBooked.value) {
        return next({ name: ROUTE_APPOINTMENT_STATUS });
    }

    return next();
}
