import {
    creatInterviewAnswer,
    putAnswerVideo,
} from '@/api/interviews';

export async function processAnswer(playbackURL, options) {
    let blob = await fetch(playbackURL)
        .then(response => response.blob());

    const data = {
        ...options,
        contentType: blob.type,
    };

    const answerResponse = await creatInterviewAnswer(data);

    const presignedUrl = answerResponse.videoUploadUrl;
    const response = await putAnswerVideo(presignedUrl, blob);

    if (!response.ok) {
        throw response;
    }

    return answerResponse;
}
