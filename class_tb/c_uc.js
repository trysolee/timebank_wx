// 
// 孩子
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
    this.UID = function() {
        return this.BUF.UID;
    };
    // 
    this.存款 = function() {
        return this.BUF.JSON.存款;
    };
    // 
    this.刷新 = function() {
        this.BUF = A.BUF.getOne('user', this.UID());
    };
    //
    this.is好友 = function() {
        // if (this.BUF.JSON.角色 != '孩子') return false;
        if (this.JID() - A.My.家庭id == 0) return false;
        return true;
    };
    //
    // 
    this.is空闲中 = function() {
        var o = A.DAT.get_当前执行包();
        return !A.SYS.isObject(o);
    };
    // 
    // 正在执行任务
    this.is任务中 = function() {
        var o = A.DAT.get_当前执行包();
        return o.类型 == '任务';
    };
    // 
    this.is提款中 = function() {
        var o = A.DAT.get_当前执行包();
        return o.类型 == '提款';
    };
    // 
    // this.set执行包 = function(b) {
    //     this.BUF.JSON.执行包 = b;
    //     this.BUF.JSON.任务中 = true;
    // };
    // // 
    // this.get执行包 = function() {
    //     return this.BUF.JSON.执行包;
    // };
    // // 
    // this.end执行 = function() {
    //     this.BUF.JSON.任务中 = false;
    // };
    // 
    // 用于列表
    // 1 . 无任务 ( 只显示昵称 )
    // 2 . 有任务 ( 显示剩余时间 )
    this.列表名称 = function() {
        return this.名称();
    };
    // 
    // 用于列表
    this.名称_存款 = function() {
        A.PAGE.set('UID', this.UID());
        var z = A.DAT.get_当前执行包();
        if (A.SYS.isObject(z)) {
            if (z.类型 == '任务') {
                return this.名称() //
                    + ' [ 任务中... ]';
            }
            return this.名称() //
                + ' [ 提款中... ]';
        }
        return this.名称() //
            + ' [ $' + A.SYS.秒ToStr(this.存款()) + ' ]';
    };
}
// 
const UC = {
    getByID: function(uid) {
        var b = A.BUF.getOne('uc', uid);
        return new FUN(b);
        // 
    },
    getByBUF: function(b) {
        // 
        return new FUN(b);
    },
    孩子列表: function() {
        // 
        var ar1 = A.BUF.getBUF('uc');
        var ar2 = [];
        for (var i in ar1) {
            var u = new FUN(ar1[i]);
            if (u.is好友()) {
                continue;
            }
            ar2.push(u);
        }
        return ar2;
    },
    孩子_好友列表: function() {
        // 按分数排序
        // 
        var ar1 = A.BUF.getBUF('user');
        var ar2 = [];
        for (var i in ar1) {
            var u = new FUN(ar1[i]);
            ar2.push(u);
        }
        return ar2;
    },
};
module.exports = UC;