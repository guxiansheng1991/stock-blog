class Group {
  constructor(name, deleteFlag, remark, userId, groupId) {
    this.name = name;
    this.deleteFlag = deleteFlag;
    this.remark = remark;
    this.userId = userId;
    this.groupId = groupId;
  }
}

module.exports = Group;
