import { inject, computed } from 'vue';

export function useVideoState() {
    const state = inject('state');

    const isReviewing = computed(() => state.isReviewing );
    const isPlaying = computed(() => state.isPlaying );
    const canPlay = computed(() => state.canPlay );

    return {
        state,
        isReviewing,
        isPlaying,
        canPlay,
    };
}
