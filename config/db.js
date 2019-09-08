const env  = process.env.NODE_ENV;
let MYSQL_CONFIG = {};
let REDIS_CONF = {};

if (env === 'dev') {
  // mysql 配置
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  };

  // redis配置
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  };
}

if (env === 'production') {
  // mysql 配置
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  };

  // redis配置
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  };
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONF
};