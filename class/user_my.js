// 我的数据
const DAT = {
    当前JID: -1,
    当前分组: '',
    UID: '',
    用户名: '',
    // 
    is超级管理员: false,
    is系统管理员: false,
    is分组管理员: false,
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