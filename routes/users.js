const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
const UserModel = require('../model/user/user');
const UserController = require('../controller/user/user');

router.prefix('/user');

router.get('/login', async function (ctx, next) {
  await ctx.render('user/login', {
    title: '登录'
  });
});

// 执行登录方法
router.post('/login', async function (ctx, next) {
  const { inputUsername, inputPassword } = ctx.request.body;
  const user = new UserModel(inputUsername, inputPassword);
  const userController = new UserController();
  try {
    const res = await userController.login(user);
    if (res.length > 0) {
      ctx.session.username = res[0].user_name;
      await ctx.redirect('/');
    } else {
      // 未注册用户
      await ctx.render('error', new ErrorModel(res, '登录出错'));
    }
  } catch (e) {
    console.error('登录出错', e);
    ctx.render('error', new ErrorModel(e, '登录出错'));
  }
});

router.get('/bar', async function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});

module.exports = router;
