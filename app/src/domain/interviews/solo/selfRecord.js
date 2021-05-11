import {
    creatInterviewAnswer,
    putAnswerVideo,
} from '@/api/interviews';

export async function processAnswer(options) {
    let blob = await fetch(options.playbackURL).then(r => r.blob());

    console.log(`Binary blob filesize: ~${Math.round(blob.size/1e+6)} MB`)

    const answerResponse = await creatInterviewAnswer({
        'userId': options.userId,
        'taskId': options.taskId,
        'questionId': options.questionId,
        'contentType': blob.type,
    });

    const presignedUrl = answerResponse.videoUploadUrl;
    const response = await putAnswerVideo(presignedUrl, blob);

    if (!response.ok) {
        throw response;
    }

    return answerResponse;
}
