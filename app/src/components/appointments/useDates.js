export function useDates() {
    const getFormattedDatetime = (datetime, options = {}) => {
        const date = new Date(datetime);
        const dateFormat = new Intl.DateTimeFormat('en-GB', options);
        return dateFormat.format(date);
    };

    const asFormattedDate = (datetime) => {
        const format = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        };

        return getFormattedDatetime(datetime, format);
    };

    const asFormattedTime = (datetime) => {
        const format = {
            hour: 'numeric',
            minute: 'numeric',
        };

        return getFormattedDatetime(datetime, format);
    };

    return {
        getFormattedDatetime,
        asFormattedDate,
        asFormattedTime,
    };
}
