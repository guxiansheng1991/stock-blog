const { ErrorModel } = require('../model/resModel');

const loginCheck = async function (ctx, next) {
  if (ctx.session.user && ctx.session.user.user_id) {
    await next();
  } else {
    await ctx.redirect('/user/login');
  }
};

module.exports = loginCheck;