// 
const A = getApp();
// 
// 
// 创建<对象>时 , 把整个<BUF>引用过来
// <修改> 和<读取> 直接操作<BUF>
// 
const FUN = function(B) {
    this.BUF = B;
    this.JID = function() { // 家庭ID
        return this.BUF.JID;
    };
    this.名称 = function() {
        return this.BUF.JSON.NA;
    };
    this.短密 = function() {
        return this.BUF.JSON.短密;
    };
    this.UID = function() {
        return this.BUF.UID;
    };
    // 
    this.刷新 = function() {
        this.BUF = A.BUF.getOne('user', this.UID());
    };
    this.is家长 = function() {
        if (this.BUF.JSON.角色 == '家长') return true;
        if (this.is管理员()) return true;
        return false;
    };
    // 
    // 
    this.is管理员 = function() {
        if (this.BUF.JSON.角色 == '管理员') return true;
        return this.BUF.JSON.角色 == '系统管';
    };
    // 
    // 
    // 用于列表
    this.列表名称 = function() {
        // return this.名称();
        if (this.is管理员()) {
            return this.名称() + ' [ 管理员 ]';
        }
        return this.名称() + ' [ 家长 ]';
    };
}
// 
const OBJ = {
    getByID: function(uid) {
        var b = A.BUF.getOne('uh', uid);
        return new FUN(b);
        // 
    },
    getByBUF: function(b) {
        // 
        return new FUN(b);
    },
    家长列表: function() {
        // 
        var ar1 = A.BUF.getBUF('uh');
        var ar2 = [];
        for (var i in ar1) {
            var u = new FUN(ar1[i]);
            ar2.push(u);
        }
        return ar2;
    },
};
module.exports = OBJ;