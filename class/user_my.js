// 我的数据
const DAT = {
    家庭id: -1,
    角色: '',
    UID: '',
    用户名: '',
    家庭名称: '',
    // 
    is系统管理员: false,
    is管理员: false,
    // 
    分组权限: function(JID, 分组) {
        if (this.系统权限()) return true;
        // if (this.超级权限()) return true;
        // 
        return this.is分组管理员;
    },
    系统权限: function() {
        if (this.超级权限()) return true;
        // 
        return this.is系统管理员;
    },
    超级权限: function() {
        return this.is超级管理员;
    },
    // 
    is当前项目: function(JID) {
        return JID == this.当前JID;
    },
    is当前分组: function(分组) {
        return 分组 == this.当前分组;
    },
};
module.exports = DAT;