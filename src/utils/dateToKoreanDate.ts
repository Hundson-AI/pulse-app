export const renderFormattedDate = (dateString: string) => {
    const messageDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - messageDate.getTime();

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMinutes < 1) {
        return '방금 전'; // Just now
    } else if (diffMinutes < 60) {
        return `${diffMinutes}분 전`; // x minutes ago
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`; // x hours ago
    } else if (diffDays < 30) {
        return `${diffDays}일 전`; // x days ago
    } else {
        // For dates older than 30 days, format as "YYYY년 M월 D일"
        const year = messageDate.getFullYear();
        const month = messageDate.getMonth() + 1; // Months are zero-indexed
        const day = messageDate.getDate();
        return `${year}년 ${month}월 ${day}일`;
    }
};
