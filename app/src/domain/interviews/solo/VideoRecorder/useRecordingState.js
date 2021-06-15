import { computed } from 'vue';

export const statuses = Object.freeze({
    READY: 'ready',
    RECORDING: 'recording',
    COUNTDOWN: 'countdown',
    PAUSED: 'paused',
});

export function useRecordingState(state) {
    return {
        isReady: computed(() => state.status === statuses.READY),
        isRecording: computed(() => state.status === statuses.RECORDING),
        isCountdown: computed(() => state.status === statuses.COUNTDOWN),
        isPaused: computed(() => state.status === statuses.PAUSED),
    };
}
