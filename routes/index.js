const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.get('/', loginCheck, async (ctx, next) => {
  await ctx.redirect('/blog/list');
});

module.exports = router;
