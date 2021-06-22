import {
    creatInterviewAnswer,
    putAnswerVideo,
} from '@/api/interviews';

export async function processAnswer(options) {
    let blob = await fetch(options.playbackURL).then(r => r.blob());

    console.log(`Binary blob filesize: ~${Math.round(blob.size/1e+6)} MB`);

    const data = {
        'anonUserId': options.anonUserId,
        'taskId': options.taskId,
        'questionId': options.questionId,
        'contentType': blob.type,
    };

    const answerResponse = await creatInterviewAnswer(data);

    const presignedUrl = answerResponse.videoUploadUrl;
    const response = await putAnswerVideo(presignedUrl, blob);

    if (!response.ok) {
        throw response;
    }

    return answerResponse;
}
