# stock-blog
股票分析的博客网站, 可以完成股票分析的记录, 帮助学习

# 数据库
stock-blog

user
```mysql
CREATE TABLE `stock-blog`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
COMMENT = '用户表';

insert into user(user_name, user_password) values('syc', '123456');
```
blog
```mysql
CREATE TABLE `stock-blog`.`blog` (
  `blog_id` INT NOT NULL AUTO_INCREMENT,
  `blog_name` VARCHAR(45) NOT NULL,
  `group_id` INT NOT NULL,
  `blog_remark` VARCHAR(500) NULL,
  `blog_content` VARCHAR(1000) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`blog_id`))
COMMENT = '博客表';

insert into blog(blog_name, blog_remark, blog_content, group_id, user_id) values('测试1', '', '测试1的内容', 1, 1);
```
group
```mysql
CREATE TABLE `stock-blog`.`group` (
  `group_id` INT NOT NULL,
  `group_name` VARCHAR(45) NOT NULL,
  `group_remark` VARCHAR(500) NULL,
  `group_delete_flag` TINYINT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`group_id`))
COMMENT = '分组';

insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已买过', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已关注', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已放弃', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('其他', 0, '', 1);
```
comment
```mysql
CREATE TABLE `stock-blog`.`comment` (
  `comment_id` INT NOT NULL,
  `comment_content` VARCHAR(500) NOT NULL,
  `comment_time` VARCHAR(45) NOT NULL,
  `comment_imgs` VARCHAR(200) NULL,
  `blog_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`))
COMMENT = '评论';

insert into comment(comment_content, comment_imgs, comment_time, blog_id, user_id) values('评论测试1', '', 1567931341843, 1, 1);
```