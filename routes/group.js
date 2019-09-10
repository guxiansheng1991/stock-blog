const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
const Group = require('../model/group/group');
const GroupController = require('../controller/group/group');

router.prefix('/group');

router.get('/list', loginCheck, async (ctx, next) => {
  const userId = ctx.session.user.user_id;
  const groupController = new GroupController();
  try {
    const list = await groupController.getGroupList(userId);
    await ctx.render('group/group', {
      list: list,
      title: '分组列表',
      user: ctx.session.user
    });
  } catch (e) {
    console.error(e);
    await ctx.render('error', new ErrorModel(e, '查询失败'));
  }
});

router.get('/add', loginCheck, async (ctx, next) => {
  await ctx.render('group/add', {
    user: ctx.session.user,
    title: '新增分组'
  });
});
router.post('/add', loginCheck, async (ctx, next) => {
  const { groupName, groupRemark } = ctx.request.body;
  const group = new Group(groupName, 1, groupRemark, ctx.session.user.user_id, -1);
  const groupController = new GroupController();
  try {
    await groupController.addGroup(group);
    ctx.redirect('/group/list');
  } catch (e) {
    ctx.render('error', e);
  }
});

router.get('/update', loginCheck, async (ctx, next) => {
  const { groupId } = ctx.request.query;
  const groupController = new GroupController();
  try {
    const detail = await groupController.getGroupDetail(groupId, ctx.session.user.user_id);
    if (detail.errno === 200) {
      await ctx.render('group/update', {
        user: ctx.session.user,
        title: '更新分组',
        group: detail.data,
        error: ''
      });
    } else {
      await ctx.render('group/update', {
        user: ctx.session.user,
        title: '更新分组',
        group: {},
        error: '查询分组详情失败'
      });
    }
  } catch (e) {
    console.error('查询group详情失败', e);
  }
});

router.post('/update', async (ctx, next) => {
  const { groupId, groupName, groupRemark } = ctx.request.body;
  const group = new Group(groupName, 1, groupRemark, ctx.session.user.user_id, groupId);
  const groupController = new GroupController();
  try {
    await groupController.update(group);
    ctx.redirect('/group/list');
  } catch (e) {
    console.error('更新失败', e);
    ctx.render('error', e);
  }
});

router.get('/delete', async (ctx, next) => {
  const { groupId } = ctx.request.query;
  const groupController = new GroupController();
  try {
    await groupController.deleteGroup(groupId, ctx.session.user.user_id);
    ctx.redirect('/group/list');
  } catch (e) {
    console.error('删除失败', e);
    ctx.render('error', e);
  }
});

module.exports = router;
