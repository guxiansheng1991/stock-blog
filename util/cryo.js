const cryoto = require('crypto');

// 秘钥
const SECRET_KEY = 'syc_1234567890#!AAA';

// md5加密
function md5(content) {
    let md5 = cryoto.createHash('md5');
    return md5.update(content).digest('hex');
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

module.exports = {
    genPassword
};