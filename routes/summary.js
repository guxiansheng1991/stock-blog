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

module.exports = router;
