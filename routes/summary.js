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

module.exports = router;
