const router = require('koa-router')();
const { base64Toimg } = require('../util/file');
const { uploadFilePath } = require('../config/file');
const moment = require('moment')();
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
      ele.comment_imgs = ele.comment_imgs.split(' ');
    } else {
      ele.comment_imgs = [];
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
      list: initList(list),
      blogId: blogId
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

router.post('/add', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { inputCommentContent, inputCommentConclusion, inputCommentImgs, blogId, inputCommentTime } = ctx.request.body;
  let currentTime = Date.now();
  if (inputCommentTime) {
    const date = new Date(inputCommentTime);
    currentTime = date.getTime();
  }
  const commentController = new CommentController();
  const comment = new CommentModel(-1, inputCommentContent, currentTime, inputCommentImgs, inputCommentConclusion, blogId, userId);
  try {
    const res = await commentController.add(comment);
    ctx.body = new SuccessModel(res, '新增成功');
  } catch (e) {
    console.error('新增评论错误', e);
    ctx.body = new ErrorModel('新增评论错误', e);
  }
});

router.get('/delete', async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { blogId } = ctx.request.query;
  const commentController = new CommentController();
  try {
    await commentController.del(blogId, userId);
    ctx.redirect(`/comment/list?blogId=${blogId}`);
  } catch (e) {
    console.error('删除评论失败', e);
    ctx.body = new ErrorModel(e, '删除评论失败');
  }
});

module.exports = router;
