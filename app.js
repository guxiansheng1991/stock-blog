const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const koaBody = require('koa-body');
const logger = require('koa-logger');

const session = require('koa-generic-session');
// const redisStore = require('koa-redis');
const { REDIS_CONF } = require('./config/db');
const { uploadFilePath } = require('./config/file');
const path = require('path');
const fs = require('fs');

const index = require('./routes/index');
const users = require('./routes/users');
const group = require('./routes/group');
const blog = require('./routes/blog');
const comment = require('./routes/comment');

// error handler
onerror(app);

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }));
app.use(koaBody({
  // 支持文件上传
  multipart:true,
  // encoding:'gzip',
  formidable: {
    // 设置文件上传目录
    uploadDir: uploadFilePath,
    // 保持文件的后缀
    keepExtensions: true,
    // 文件上传大小
    maxFieldsSize: 2 * 1024 * 1024
  }
}));

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

app.keys = ['syc_1234567890#!BBB'];
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // store: redisStore({
  //   all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  // })
}));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(group.routes(), group.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(comment.routes(), comment.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
