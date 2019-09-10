const { exec, escape } = require('../../db/mysql');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

class GroupController {
  constructor() {}

  /**
   * 获取特定用户的group列表
   * @param userId 用户id
   * @returns {*}
   */
  async getGroupList(userId) {
    userId = escape(userId);
    const sql = `select group_id, group_name, group_remark, group_delete_flag, user_id from \`group\` where user_id=${userId}`;
    return exec(sql);
  }

  /**
   * 获取group详情
   * @param groupId group的id
   * @returns {*}
   */
  async getGroupDetail(groupId, userId) {
    groupId = escape(groupId);
    userId = escape(userId);
    const sql = `select group_id, group_name, group_remark, group_delete_flag, user_id from \`group\` where group_id=${groupId} and user_id=${userId}`;
    console.log('sql', sql);
    try {
      const groupList = await exec(sql);
      console.log('groupList', groupList);
      if (groupList.length > 0) {
        return Promise.resolve(new SuccessModel(groupList[0], 'success'));
      } else {
        return Promise.reject(new ErrorModel({}, 'fail'));
      }
    } catch (e) {
      console.error(e);
      return Promise.reject(new ErrorModel(e, 'fail'));
    }
  }

  /**
   * 新增
   * @param groupName 分组名字
   * @param groupRemark 分组备注
   * @param groupDeleteFlag 分组可否删除标识
   * @param userId 用户id
   * @returns {*}
   */
  async addGroup(group) {
    const groupName = escape(group.name);
    const groupRemark = escape(group.remark);
    const groupDeleteFlag = escape(group.deleteFlag);
    const userId = escape(group.userId);
    const sql = `insert into \`group\`(group_name, group_remark, group_delete_flag, user_id) values(${groupName}, ${groupRemark}, ${groupDeleteFlag}, ${userId})`;
    try {
      const addRes = await exec(sql);
      if (addRes.affectedRows > 0) {
        return Promise.resolve(new SuccessModel(addRes, '新增成功'));
      } else {
        console.error('新增失败', addRes);
        return Promise.reject(new ErrorModel(addRes, '新增失败'));
      }
    } catch (e) {
      console.error('新增失败', e);
      return Promise.reject(new ErrorModel({}, '新增失败'));
    }
  }

  /**
   * 删除group
   * @param groupId
   * @param userId
   * @returns {Promise<*|undefined>}
   */
  async deleteGroup(groupId, userId) {
    try {
      const group = await this.getGroupDetail(groupId, userId);
      if (group.group_delete_flag === 0) {
        return Promise.reject(new ErrorModel({}, '不可删除分组'));
      } else {
        groupId = escape(groupId);
        userId = escape(userId);
        const sql = `delete from \`group\` where group_id=${groupId} and user_id=${userId}`;
        console.log('sql', sql);
        const deleteRes = await exec(sql);
        console.log('deleteRes', deleteRes);
        if (deleteRes.affectedRows > 0) {
          return Promise.resolve(new SuccessModel(deleteRes, '删除操作成功'));
        } else {
          return Promise.reject(new ErrorModel(deleteRes, '删除操作失败'));
        }
      }
    } catch (e) {
      return Promise.reject(new ErrorModel({}, '删除分组操作错误'));
    }
  }

  /**
   * 更新
   * @param group
   * @returns {Promise<*|undefined>}
   */
  async update(group) {
    const groupName = escape(group.name);
    const groupRemark = escape(group.remark);
    const userId = escape(group.userId);
    const groupId = escape(group.groupId);
    const sql = `update \`group\` set group_name=${groupName}, group_remark=${groupRemark} where group_id=${groupId} and user_id=${userId}`;
    console.log('sql', sql);
    try {
      const updateRes = await exec(sql);
      if (updateRes.affectedRows > 0) {
        return Promise.resolve(new SuccessModel(updateRes, '更新操作成功'));
      } else {
        return Promise.reject(new ErrorModel(updateRes, '更新操作失败'));
      }
    } catch (e) {
      console.error(e);
      return Promise.reject(new ErrorModel({}, '更新操作失败'));
    }
  }
}

module.exports = GroupController;
