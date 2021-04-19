import { computed } from 'vue';
import { useStore } from 'vuex';

export function useDevices() {
	const store = useStore();

	navigator.mediaDevices.ondevicechange = () => {
		store.dispatch('interviews/updateMediaDevices');
	};

	return {
        declinedPermission: computed(() => store.state.interviews.declinedPermissions),
        activeCameraName: computed(() => store.getters['interviews/getActiveVideoInputName']),
        activeMicrophoneName: computed(() => store.getters['interviews/getActiveAudioInputName']),
		hasCamera: computed(() => store.getters['interviews/hasConnectedVideoInput']),
		hasMicrophone: computed(() => store.getters['interviews/hasConnectedAudioInput']),
        hasSpeakers: computed(() => store.getters['interviews/hasConnectedAudioOuput']),
	}
}
