const { exec, escape } = require('../../db/mysql');
const { genPassword } = require('../../util/cryo');

class UserController {
  constructor() {}
  async login(userModel) {
    const username = escape(userModel.username);
    let password = genPassword(userModel.password);
    password = escape(password);
    const sql = `select user_id, user_name, user_password from user where user_name=${username} and user_password=${password}`;
    return exec(sql);
  }
}

module.exports = UserController;
