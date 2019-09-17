const xss = require('xss');
const { exec, escape } = require('../../db/mysql');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

class SummaryController {
  constructor() {}

  async getList(userId) {
    userId = escape(userId);
    const sql = `select * from summary where user_id=${userId}`;
    console.log(sql);
    try {
      const list = await exec(sql);
      console.log('getList', list);
      if (list.length > 0) {
        return Promise.resolve(list);
      } else {
        return Promise.reject(list);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async detail(userId, summaryId) {
    userId = escape(userId);
    summaryId = escape(summaryId);
    const sql = `select * from summary where user_id=${userId} and summary_id=${summaryId}`;
    try {
      const res = await exec(sql);
      if (res.length > 0) {
        return Promise.resolve(res[0]);
      } else {
        return Promise.reject(res);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async add(summary) {
    const userId = escape(summary.userId);
    const summaryTitle = escape(summary.summaryTitle);
    const summaryContent = escape(xss(summary.summaryContent));
    const summaryTime = escape(summary.summaryTime);
    const sql = `insert into summary(summary_title, summary_content, summary_time, user_id)  
                  values(${summaryTitle}, ${summaryContent}, ${summaryTime}, ${userId})`;
    console.log(sql);
    try {
      const res = await exec(sql);
      if (res.affectedRows > 0) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async update(summary) {
    const userId = escape(summary.userId);
    const summaryId = escape(summary.summaryId);
    const summaryTitle = escape(summary.summaryTitle);
    const summaryContent = escape(xss(summary.summaryContent));
    const sql = `update summary set summary_title=${summaryTitle}, summary_content=${summaryContent} where user_id=${userId} and summary_id=${summaryId}`;
    console.log(sql);
    try {
      const res = await exec(sql);
      if (res.affectedRows > 0) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async delete(userId, summaryId) {
    userId = escape(userId);
    summaryId = escape(summaryId);
    const sql = `delete from summary where user_id=${userId} and summary_id=${summaryId}`;
    console.log(sql);
    try {
      const res = await exec(sql);
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

module.exports = SummaryController;
