var UNSUPPORTED_URL = '/unsupported.html';

function detectBrowserRtcCapabilities() {
    var isWebRTCSupported = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    window.RTCPeerConnection;

    if (window.navigator.userAgent.indexOf("Edge") > -1) {
        return UNSUPPORTED_URL;
    }

    if (isWebRTCSupported) {
        return;
    }

    else {
        return UNSUPPORTED_URL;
    }
}

window.location = detectBrowserRtcCapabilities();
