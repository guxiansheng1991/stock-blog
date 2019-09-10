const { exec, escape } = require('../../db/mysql');
const { genPassword } = require('../../util/cryo');

class BlogController {
  constructor() {}
  async getBlogList(userId) {
    userId = escape(userId);
    const sql = `select * from blog where user_id=${userId}`;
    console.log(sql);
    try {
      const list = await exec(sql);
      console.log('getBlogList,', list);
      return Promise.resolve(list);
    } catch (e) {
      console.error('获取博客列表失败', e);
      Promise.reject(e);
    }
  }

  async add(blog) {
    const blogName = escape(blog.blogName);
    const blogContent = escape(blog.blogContent);
    const blogRemark = escape(blog.blogRemark);
    const groupId = escape(blog.groupId);
    const userId = escape(blog.userId);
    const blogCreateTime = escape(blog.blogCreateTime);
    const sql = `insert into blog(blog_name, blog_content, blog_remark, group_id, user_id, blog_createTime) 
                    values(${blogName}, ${blogContent}, ${blogRemark}, ${groupId}, ${userId}, ${blogCreateTime})`;
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
      console.error('add', e);
      return Promise.reject(e);
    }
  }

  async update(blog) {
    const blogId = escape(blog.blogId);
    const blogName = escape(blog.blogName);
    const blogContent = escape(blog.blogContent);
    const blogRemark = escape(blog.blogRemark);
    const groupId = escape(blog.groupId);
    const userId = escape(blog.userId);
    const sql = `update blog set blog_name=${blogName}, blog_content=${blogContent}, blog_remark=${blogRemark}, group_id=${groupId} 
                  where blog_id=${blogId} and user_id=${userId}`;
    console.log(sql);
    try {
      const res = await exec(sql);
      console.log('update', res);
      if (res.affectedRows > 0) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (e) {
      console.error('update', e);
      return Promise.reject(e);
    }
  }

  async detail(blogId, userId) {
    blogId = escape(blogId);
    userId = escape(userId);
    const sql = `select * from blog where blog_id=${blogId} and user_id=${userId}`;
    console.log(sql);
    try {
      const detail = await exec(sql);
      console.log('detail,', detail);
      if (detail.length > 0) {
        return Promise.resolve(detail[0]);
      } else {
        return Promise.reject({});
      }
    } catch (e) {
      console.error('detail 失败', e);
      return Promise.reject(e);
    }
  }

  async delete(blogId, userId) {
    blogId = escape(blogId);
    userId = escape(userId);
    const sql = `delete from blog where blog_id=${blogId} and user_id=${userId}`;
    console.log(sql);
    try {
      const res = await exec(sql);
      console.log('delete', res);
      if (res.affectedRows > 0) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (e) {
      console.error('删除失败', e);
      return Promise.reject(e);
    }
  }
}

module.exports = BlogController;
