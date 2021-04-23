import { ref, shallowReactive, onMounted, onBeforeUnmount } from 'vue';
import { createLocalVideoTrack } from 'twilio-video';

export function useVideoPreview() {
    const localVideoElement = ref(null);
    const localTrack = shallowReactive({});

    /**
     * Creates a local video feed on the localVideoElement
     */
    const setupLocalVideoTrack = () => {
        createLocalVideoTrack()
            .then((track) => {
                localTrack.value = track;
                localTrack.value.attach(localVideoElement.value);
            });
    };

    /**
     * Stops and destroys the local video feed
     */
    const destroyLocalVideoTrack = async () => {
        await localTrack.value.stop();
        const media = localTrack.value.detach();
        media.forEach(element => element.remove());
    };

    onMounted(setupLocalVideoTrack);
    onBeforeUnmount(destroyLocalVideoTrack);

    return {
        localVideoElement,
    };
}
