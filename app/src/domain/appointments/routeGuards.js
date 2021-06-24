import { computed } from 'vue';
import { store } from '@/store';
import { ROUTE_APPOINTMENT_STATUS, ROUTE_LIVE_LANDING } from '@/routeConstants';

export const hasAppointmentGuard = (to, from, next) => {
    const isStatusBooked = computed(() => store.getters['appointments/isStatusBooked']);
    
    if (isStatusBooked.value) {
        return next({ name: ROUTE_APPOINTMENT_STATUS });
    }

    return next();
}

export const hasAppointmentTodayGuard = (to, from, next) => {
    const isToday = computed(() => store.state.appointments.isToday);

    if (!isToday.value) {
        return next();
    }

    const interviewId = computed(() => store.state.interviews.id);

    if (interviewId.value) {
        return next({ name: ROUTE_LIVE_LANDING, params: {
            id: interviewId.value,
        }});
    }

    return next();
}
