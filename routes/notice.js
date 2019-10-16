const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
const NoticeModel = require('../model/notice/notice');
const NoticeController = require('../controller/notice/notice');

router.prefix('/notice');

router.get('/list', loginCheck, async function (ctx, next) {
    const userId = ctx.session.user.user_id;
    try {
        const noticeController = new NoticeController();
        const list = await noticeController.list(userId);
        await ctx.render('notice/notice', {
            title: '公告',
            user: ctx.session.user,
            list: noticeController.sortList(list)
        });
    } catch (e) {
        console.error('获取公告列表失败', e);
        ctx.body = new ErrorModel(e, 'fail');
    }
});

router.get('/add', loginCheck, async function (ctx, next) {
    await ctx.render('notice/add', {
        title: '新增公告',
        user: ctx.session.user
    });
});

router.post('/add', loginCheck, async function (ctx, next) {
    const userId = ctx.session.user.user_id;
    const body = ctx.request.body;
    const noticeModel = new NoticeModel(body.content, body.time, body.stick, -1, userId);
    const noticeController = new NoticeController();
    try {
        const res = await noticeController.add(noticeModel);
        ctx.body = new SuccessModel(res, 'success');
    } catch (e) {
        ctx.body = new ErrorModel(e, 'fail');
    }
});

router.get('/update', loginCheck, async function (ctx, next) {
    const userId = ctx.session.user.user_id;
    const noticeId = ctx.request.query.noticeId;
    const noticeController = new NoticeController();
    try {
        const notice = await noticeController.detail(noticeId, userId);
        await ctx.render('notice/update', {
            title: '更新公告',
            user: ctx.session.user,
            notice: notice
        });
    } catch (e) {
        ctx.body = new ErrorModel(e, 'fail');
    }
});

router.post('/update', loginCheck, async function (ctx, next) {
    const userId = ctx.session.user.user_id;
    const body = ctx.request.body;
    const noticeModel = new NoticeModel(body.content, body.time, body.stick, body.noticeId, userId);
    const noticeController = new NoticeController();
    try {
        const res = await noticeController.update(noticeModel);
        ctx.body = new SuccessModel(res, 'success');
    } catch (e) {
        ctx.body = new ErrorModel(e, 'fail');
    }
});

router.get('/delete', loginCheck, async function (ctx, next) {
    const userId = ctx.session.user.user_id;
    const noticeId = ctx.request.query.noticeId;
    const noticeController = new NoticeController();
    try {
        await noticeController.del(userId, noticeId);
        await ctx.redirect('/notice/list');
    } catch (e) {
        ctx.body = new ErrorModel(e, 'fail');
    }
});

module.exports = router;
