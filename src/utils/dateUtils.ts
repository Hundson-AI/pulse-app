export function isSameDay(d1: Date, d2: Date): boolean {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

export function dateStringToDate(dateStr: string): Date {
    const dateObj = new Date(dateStr);
    return dateObj;
}

export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}년 ${month}월 ${day}일`;
};

export const formatTime = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${hours}:${minutes}`;
};
