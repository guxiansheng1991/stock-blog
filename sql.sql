CREATE TABLE `stock-blog`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
COMMENT = '用户表';
insert into user(user_name, user_password) values('syc', 'e0933d0bb16e76a1f8ff81c8a5e8a2c5');

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

CREATE TABLE `stock-blog`.`group` (
  `group_id` INT NOT NULL AUTO_INCREMENT,
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

CREATE TABLE `stock-blog`.`comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `comment_content` VARCHAR(500) NOT NULL,
  `comment_time` VARCHAR(45) NOT NULL,
  `comment_imgs` VARCHAR(200) NULL,
  `blog_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`))
COMMENT = '评论';
insert into comment(comment_content, comment_imgs, comment_time, blog_id, user_id) values('评论测试1', '', 1567931341843, 1, 1);

insert into user(user_name, user_password) values('syc', '123456');

insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已买过', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已关注', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已放弃', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('其他', 0, '', 1);

insert into blog(blog_name, blog_remark, blog_content, group_id, user_id) values('测试1', '', '测试1的内容', 1, 1);

insert into comment(comment_content, comment_imgs, comment_time, blog_id, user_id) values('评论测试1', '', 1567931341843, 1, 1);

select user_id, user_name, user_password from user where user_name='syc' and user_password='123456';


select group_id, group_name, group_remark, group_delete_flag, user_id from `group` where group_id=12 and user_id='1';

select blog_id, blog_name, blog_content, blog_remark, group_id, user_id from blog where user_id=1;

insert into blog(blog_name, blog_content, blog_remark, group_id, user_id) values();

select * from blog where blog_id=1 and user_id=1;

update blog set blog_name='', blog_content='', blog_remark='', group_id=1 where blog_id=1 and user_id=1;

delete from blog where blog_id=2 and user_id=1;
