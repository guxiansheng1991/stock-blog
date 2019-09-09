const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
const Group = require('../model/group/group');
const GroupController = require('../controller/group/group');

router.prefix('/group');

router.get('/list', loginCheck, async (ctx, next) => {
  const userId = ctx.query.userId;
  const groupController = new GroupController();
  try {
    const list = await groupController.getGroupList(userId);
    await ctx.render('group/group', {
      list: list,
      title: '分组列表',
      username: ctx.session.username
    });
  } catch (e) {
    console.error(e);
    await ctx.render('error', new ErrorModel(e, '查询失败'));
  }
});

module.exports = router;
