var UNSUPPORTED_URL = '/unsupported.html';

function detectBrowserRtcCapabilities() {
    var isWebRTCSupported = navigator.getUserMedia ||
    window.RTCPeerConnection;

    if (window.navigator.userAgent.indexOf('Edge') > -1) {
        window.location.href = UNSUPPORTED_URL;
    }

    if (isWebRTCSupported) {
        return;
    }

    else {
        window.location.href = UNSUPPORTED_URL;
    }
}

detectBrowserRtcCapabilities();
