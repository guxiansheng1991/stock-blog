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
}

module.exports = SummaryController;
