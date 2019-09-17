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
}

module.exports = SummaryController;
