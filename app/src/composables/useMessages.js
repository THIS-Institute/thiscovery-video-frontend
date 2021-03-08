export function useMessages(messages) {
    const message = (key) => {

        const keys = key.split('.');

        if (!Array.isArray(keys)) {
            return null;
        }

        let output = null;

        keys.forEach(value => {
            if (output) {
                output = output[value];
            } else {
                output = messages[value];
            }
        });

        return output;
    };

    return { message };
}
