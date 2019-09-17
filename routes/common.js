const router = require('koa-router')();
const { base64Toimg } = require('../util/file');
const { uploadFilePath, uploadFileRelativePath } = require('../config/file');
const moment = require('moment')();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/common');

router.post('/uploadImg', loginCheck, async (ctx, next) => {
    let { inputImgs } = ctx.request.body;
    const filename = moment.format('YYYYMMDD') + Number.parseInt(Math.random() * 1000) + '.png';
    try {
        await base64Toimg(inputImgs, uploadFilePath + filename);
        const httpImgPath = uploadFileRelativePath + filename;
        ctx.body = new SuccessModel(httpImgPath, '上传成功');
    } catch (e) {
        console.error('文件上传失败', e);
        ctx.body = new ErrorModel(e, '文件上传失败');
    }
});

module.exports = router;