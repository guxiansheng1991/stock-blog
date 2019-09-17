const xss = require('xss');
const { exec, escape } = require('../../db/mysql');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

class CommentCtroller {
  constructor() {}

  async getList(blogId, userId) {
    blogId = escape(blogId);
    userId = escape(userId);
    const sql = `select * from comment where blog_id=${blogId} and user_id=${userId} order by comment_time`;
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

  async add(comment) {
      const commentContent = escape(xss(comment.commentContent));
      const commentTime = escape(comment.commentTime);
      const commentImgList = escape(comment.commentImgList);
      const commentConclusion = escape(xss(comment.commentConclusion));
      const blogId = escape(comment.blogId);
      const userId = escape(comment.userId);
      const sql = `insert into comment(comment_content, comment_time, comment_imgs, conclusion, blog_id, user_id) 
                        values(${commentContent},${commentTime},${commentImgList},${commentConclusion},${blogId},${userId})`;
      console.log(sql);
      try {
          const res = await exec(sql);
          console.log('add', res);
          if (res.affectedRows > 0) {
              return Promise.resolve(res);
          } else {
              return Promise.reject(res);
          }
      } catch (e) {
          return Promise.reject(e);
      }
  }

  async del(blogId, userId) {
      blogId = escape(blogId);
      userId = escape(userId);
      const sql = `delete from comment where blog_id=${blogId} and user_id=${userId}`;
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

module.exports = CommentCtroller;