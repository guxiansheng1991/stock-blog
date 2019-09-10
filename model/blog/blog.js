class BlogModel {
  constructor(blogId, blogName, blogContent, blogRemark, groupId, userId) {
    this.blogId = blogId;
    this.blogName = blogName;
    this.blogContent = blogContent;
    this.blogRemark = blogRemark;
    this.groupId = groupId;
    this.userId = userId;
    this.blogCreateTime = Date.now();
  }
}
module.exports = BlogModel;
