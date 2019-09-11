const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
const BlogModel = require('../model/blog/blog');
const BlogController = require('../controller/blog/blog');
const GroupController = require('../controller/group/group');
const CommentModel = require('../model/comment/comment');
const CommentController = require('../controller/comment/comment');

router.prefix('/comment');

// 初始化数据库中获取到的comment的list
function initList(list) {
  const resList = list;
  resList.forEach((ele) => {
    if(ele.comment_imgs) {
      ele.comment_imgs = ele.comment_imgs.split(',');
    }
  });
  return resList;
}

router.get('/list', loginCheck, async (ctx, next) => {
  const { blogId } = ctx.request.query;
  const userId = ctx.session.user.user_id;
  const commentCtroller = new CommentController();
  try {
    const list = await commentCtroller.getList(blogId, userId);
    await ctx.render('comment/comment', {
      title: '点评列表',
      user: ctx.session.user,
      list: initList(list)
    });
  } catch (e) {
    console.error('点评列表错误', e);
    ctx.body = new ErrorModel(e, '点评列表错误');
  }
});

router.get('/add', async (ctx, next) => {
  const { blogId, blogName } = ctx.request.query;
  await ctx.render('comment/add', {
    title: `新增, ${blogName}`,
    user: ctx.session.user
  });
});

module.exports = router;
