class CommentModel {
  constructor(commentId, commentContent, commentTime, commentImgList, commentConclusion, blogId, userId) {
    this.commentId = commentId;
    this.commentContent = commentContent;
    this.commentTime = commentTime;
    this.commentImgList = commentImgList;
    this.commentConclusion = commentConclusion;
    this.blogId = blogId;
    this.userId = userId;
  }
}

module.exports = CommentModel;
