insert into user(user_name, user_password) values('syc', '123456');

insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已买过', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已关注', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('已放弃', 0, '', 1);
insert into `group`(group_name, group_delete_flag, group_remark, user_id) values('其他', 0, '', 1);

insert into blog(blog_name, blog_remark, blog_content, group_id, user_id) values('测试1', '', '测试1的内容', 1, 1);

insert into comment(comment_content, comment_imgs, comment_time, blog_id, user_id) values('评论测试1', '', 1567931341843, 1, 1);

select user_id, user_name, user_password from user where user_name='syc' and user_password='123456';