const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
const SummaryModel = require('../model/summary/summary');
const SummaryController = require('../controller/summary/summary');

router.prefix('/summary');

router.get('/list', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  try {
    const summaryController = new SummaryController();
    const list = await summaryController.getList(userId);
    console.log('list', list);
    await ctx.render('summary/summary', {
      title: '总结列表',
      user: ctx.session.user,
      list: list
    });
  } catch (e) {
    ctx.body = new ErrorModel(e, '请求总结列表失败');
  }
});

router.get('/add', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  await ctx.render('summary/add', {
    title: '新增总结',
    user: ctx.session.user
  });
});

router.post('/add', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { summaryContent, summaryTitle } = ctx.request.body;
  const currentTime = Date.now();
  const summaryModel = new SummaryModel(-1, summaryTitle, summaryContent,currentTime, userId);
  const summaryController = new SummaryController();
  try {
    const res = await summaryController.add(summaryModel);
    ctx.body = new SuccessModel(res, '新增成功');
  } catch (e) {
    ctx.body = new ErrorModel(e, '新增失败');
  }
});

router.get('/update', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { summaryId } = ctx.request.query;
  const summaryController = new SummaryController();
  try {
    const res = await summaryController.detail(userId, summaryId);
    await ctx.render('summary/update', {
      title: '更新总结',
      user: ctx.session.user,
      detail: res
    });
  } catch (e) {
    ctx.body = new ErrorModel(e, '无此总结文章');
  }
});

router.post('/update', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { summaryContent, summaryTitle, summaryId } = ctx.request.body;
  const summaryModel = new SummaryModel(summaryId, summaryTitle, summaryContent,-1 , userId);
  const summaryController = new SummaryController();
  try {
    const res = await summaryController.update(summaryModel);
    ctx.body = new SuccessModel(res, '更新成功');
  } catch (e) {
    ctx.body = new ErrorModel(e, '更新失败');
  }
});

router.get('/delete', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const { summaryId } = ctx.request.query;
  const summaryController = new SummaryController();
  try {
    const res = await summaryController.delete(userId, summaryId);
    await ctx.redirect('/summary/list');
  } catch (e) {
    ctx.body = new ErrorModel(e, '删除失败');
  }
});

module.exports = router;
