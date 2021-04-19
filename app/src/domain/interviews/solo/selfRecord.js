import {
    creatInterviewAnswer,
    putAnswerVideo,
} from '@/api/interviews';

export async function processAnswer(options) {
    let blob = await fetch(options.playbackURL).then(r => r.blob());

    const answerResponse = await creatInterviewAnswer({});

    const presignedUrl = answerResponse.videoUploadUrl;

    const response = await putAnswerVideo(presignedUrl, blob);

    return response;
}
