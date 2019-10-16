class Notice {
    constructor(noticeContent, noticeTime, noticeStick, noticeId, userId) {
        this.noticeContent = noticeContent;
        this.noticeTime = noticeTime;
        this.noticeStick = noticeStick;
        this.noticeId = noticeId;
        this.userId = userId;
    }
}

module.exports = Notice;
