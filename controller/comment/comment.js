const { exec, escape } = require('../../db/mysql');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

class CommentCtroller {
  constructor() {}

  async getList(blogId, userId) {
    blogId = escape(blogId);
    userId = escape(userId);
    const sql = `select * from comment where blog_id=${blogId} and user_id=${userId}`;
    console.log(sql);
    try {
      const list = await exec(sql);
      console.log('getList', list);
      return Promise.resolve(list);
    } catch (e) {
      console.error('查询评论详情失败', e);
      return Promise.reject(new ErrorModel(e, '查询评论详情失败'));
    }
  }
}

module.exports = CommentCtroller;