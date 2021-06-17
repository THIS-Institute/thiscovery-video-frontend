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

    console.log(isToday);
    
    if (isToday.value) {
        const appointmentId = computed(() => store.state.appointments.appointmentId);

        return next({ name: ROUTE_LIVE_LANDING, params: {
            id: appointmentId.value,
        }});
    }

    return next();
}
