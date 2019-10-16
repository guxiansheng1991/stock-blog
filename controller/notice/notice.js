const { exec, escape } = require('../../db/mysql');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

class NoticeController {
    constructor() {}

    // 列表
    async list(userId) {
        userId = escape(userId);
        const sql = `select * from notice where user_id=${userId} order by notice_time desc`;
        console.log('sql', sql);
        try {
            const noticeList = await exec(sql);
            console.log('noticeList', noticeList);
            return Promise.resolve(noticeList);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // 排序, 将列表中的置顶元素排到第一个
    sortList(list) {
        const stickArray = list.filter((ele) => {
            return ele.notice_stick === '1';
        });
        const otherArray = list.filter((ele) => {
            return ele.notice_stick === '0';
        });
        return stickArray.concat(otherArray);
    }

    // 详情
    async detail(noticeId, userId) {
        noticeId = escape(noticeId);
        userId = escape(userId);
        const sql = `select * from notice where user_id=${userId} and notice_id=${noticeId}`;
        console.log('sql', sql);
        try {
            const list = await exec(sql);
            if (list.length > 0) {
                return Promise.resolve(list[0]);
            } else {
                return Promise.reject(list);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // 重置所有的stick
    async resetStick(userId) {
        userId = escape(userId);
        const sql = `update notice set notice_stick='0' where user_id=${userId}`;
        console.log('sql', sql);
        try {
            const res = await exec(sql);
            console.log('执行结果', res);
            return Promise.resolve(res);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // add新增
    async add(noticeModel) {
        const noticeContent = escape(noticeModel.noticeContent);
        const noticeTime = escape(noticeModel.noticeTime);
        const noticeStick = escape(noticeModel.noticeStick);
        const userId = escape(noticeModel.userId);
        const sql = `insert into notice(notice_time, notice_content, notice_stick, user_id) values(${noticeTime}, ${noticeContent}, ${noticeStick}, ${userId})`;
        console.log('sql', sql);
        try {
            if (noticeModel.noticeStick === '1') {
                await this.resetStick(userId);
            }
            const res = await exec(sql);
            console.log('执行结果', res);
            if (res.affectedRows > 0) {
                return Promise.resolve(res);
            } else {
                return Promise.reject(res);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // update更新
    async update(noticeModel) {
        const noticeContent = escape(noticeModel.noticeContent);
        const noticeTime = escape(noticeModel.noticeTime);
        const noticeStick = escape(noticeModel.noticeStick);
        const userId = escape(noticeModel.userId);
        const noticeId = escape(noticeModel.noticeId);
        const sql = `update notice set notice_content=${noticeContent}, notice_stick=${noticeStick} where user_id=${userId} and notice_id=${noticeId}`;
        console.log('sql', sql);
        try {
            if (noticeModel.noticeStick === '1') {
                await this.resetStick(userId);
            }
            const res = await exec(sql);
            console.log('执行结果', res);
            if (res.affectedRows > 0) {
                return Promise.resolve(res);
            } else {
                return Promise.reject(res);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // del
    async del(userId, noticeId) {
        noticeId = escape(noticeId);
        userId = escape(userId);
        const sql = `delete from notice where user_id=${userId} and notice_id=${noticeId}`;
        console.log('sql', sql);
        try {
            const res = await exec(sql);
            console.log('执行结果', res);
            if (res.affectedRows > 0) {
                return Promise.resolve(res);
            } else {
                return Promise.reject(res);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

module.exports = NoticeController;
