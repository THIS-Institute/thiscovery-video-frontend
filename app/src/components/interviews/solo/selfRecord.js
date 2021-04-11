import {
    // creatInterviewAnswer,
    uploadInterviewAnswerVideo,
} from '@/api/interviews';

export async function processAnswer(options) {
    let blob = await fetch(options.playbackURL).then(r => r.blob());

    const response = await uploadInterviewAnswerVideo(blob);

    console.log(response);
}
