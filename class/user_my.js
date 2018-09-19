// 我的数据
const My = {
    家庭id: -1,
    角色: '',
    UID: '',
    用户名: '',
    家庭名称: '',
    密码: '',
    // 
    is系统管理员: false,
    is管理员: false,
    //    
    管理员: function() {
        // 
        return this.is管理员;
    },
    密码OK: function(s) {
        return s == this.密码;
    }
};
module.exports = My;