/**
 * Resolves the duration of a video/webm blob
 * Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
 * 
 * @param {Blob|String} blob
 *
 * @returns {Promise<Number>} Blob duration in seconds.
 */
export default async function getBlobDuration(blob) {
	const tempVideoElement = document.createElement('video');

	const resolveDuration = new Promise((resolve, reject) => {
		tempVideoElement.addEventListener('loadedmetadata', () => {
			if(tempVideoElement.duration === Infinity) {
				tempVideoElement.currentTime = Number.MAX_SAFE_INTEGER;

				tempVideoElement.ontimeupdate = () => {
					tempVideoElement.ontimeupdate = null;
					resolve(tempVideoElement.duration);
					tempVideoElement.currentTime = 0;
				}

				return;
			}
			
			resolve(tempVideoElement.duration);
		});

		tempVideoElement.onerror = (event) => reject(event.target.error);
	})

	tempVideoElement.src = blob;

	return resolveDuration;
}
