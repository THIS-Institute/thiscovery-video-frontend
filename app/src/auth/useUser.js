import { computed } from 'vue';
import { useStore } from 'vuex';

export function useUser() {
    const store = useStore();

    return {
        hasUser: computed(() => store.getters['user/hasUser']),
		userGivenName: computed(() => store.getters['user/getGivenName']),
		userIntials: computed(() => store.getters['user/getInitials']),
    }
}
