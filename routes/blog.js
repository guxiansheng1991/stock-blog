const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
const BlogModel = require('../model/blog/blog');
const BlogController = require('../controller/blog/blog');
const GroupController = require('../controller/group/group');

router.prefix('/blog');

router.get('/list', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const blogController = new BlogController();
  const groupController = new GroupController();
  try {
    const groupList = await groupController.getGroupList(userId);
    console.log('groupList', groupList);
    const list = await blogController.getBlogList(userId, ctx.request.query);
    await ctx.render('blog/blog', {
      title: '博客列表',
      user: ctx.session.user,
      list: list,
      groupList: groupList,
      error: ''
    })
  } catch (e) {
    await ctx.render('blog/blog', {
      title: '博客列表',
      user: ctx.session.user,
      list: [],
      error: e.toString()
    })
  }
});

router.get('/add', async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const groupController = new GroupController();
  try {
    const groupList = await groupController.getGroupList(userId);
    console.log('groupList', groupList);
    await ctx.render('blog/add', {
      title: '新增博客',
      user: ctx.session.user,
      groupList: groupList,
      error: ''
    });
  } catch (e) {
    console.error('新增博客失败', e);
    await ctx.render('blog/add', {
      title: '新增博客',
      user: ctx.session.user,
      groupList: [],
      error: e.toString()
    });
  }
});
router.post('/add', async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { blogName, blogContent, blogRemark, groupId } = ctx.request.body;
  const blog = new BlogModel(-1, blogName, blogContent, blogRemark, groupId, userId);
  const blogController = new BlogController();
  try {
    await blogController.add(blog);
    await ctx.redirect('/blog/list');
  } catch (e) {
    ctx.body = new ErrorModel(e, '新增博客失败');
  }
});

router.get('/update', async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { blogId } = ctx.request.query;
  const blogController = new BlogController();
  const groupController = new GroupController();
  try {
    const detail = await blogController.detail(blogId, userId);
    const groupList = await groupController.getGroupList(userId);
    console.log('groupList', groupList);
    await ctx.render('blog/update', {
      title: '更新博客',
      user: ctx.session.user,
      groupList: groupList,
      detail: detail
    });
  } catch (e) {
    ctx.body = new ErrorModel(e, '获取博客详情失败');
  }
});
router.post('/update', async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { blogName, blogContent, blogRemark, groupId, blogId } = ctx.request.body;
  const blog = new BlogModel(blogId, blogName, blogContent, blogRemark, groupId, userId);
  const blogController = new BlogController();
  try {
    await blogController.update(blog);
    await ctx.redirect('/blog/list');
  } catch (e) {
    ctx.body = new ErrorModel(e, '更新博客失败');
  }
});

router.get('/delete', async (ctx, next) => {
  const { blogId } = ctx.request.query;
  const userId = ctx.session.user.user_id;
  const blogController = new BlogController();
  try {
    await blogController.delete(blogId, userId);
    await ctx.redirect('/blog/list');
  } catch (e) {
    ctx.body = new ErrorModel(e, '删除失败');
  }
});

module.exports = router;
