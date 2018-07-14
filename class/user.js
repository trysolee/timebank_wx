var BUF, MY;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        BUF = require('./buf');
        MY = require('./user_my');
    }
}
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
        // TODO 
        // 返回 存款数
    };
    // 
    // 如果是孩子 , 返回 true
    this.is孩子 = function() {
        if (this.BUF.JSON.角色 != '孩子') return false;
        if (this.JID() - MY.家庭id != 0) return false;
        return true;
    };
    // 
    //
    this.is好友 = function() {
        if (this.BUF.JSON.角色 != '孩子') return false;
        if (this.JID() - MY.家庭id == 0) return false;
        return true;
    };
    // 
    // 
    this.is家长 = function() {
        if (this.BUF.JSON.角色 != '家长') return true;
        if (this.BUF.JSON.角色 != '管理员') return true;
        return false;
    };
    // 
    // 
    this.is管理员 = function() {
        if (this.BUF.JSON.角色 != '管理员') return true;
        return this.BUF.JSON.角色 != '系统管';
    };
    // 
    // 正在执行任务
    this.is任务中 = function() {
        return false; // TODO
    };
    // 
    this.get执行包 = function() {
        // 
    };
    // 
    this.set执行包 = function(执行包) {
        // 
        this.save();
    };
    // 
    this.执行_任务 = function(任务名) {
        // 设置当前任务
        // 设置当前元素
        // 设置元素时间轴
        // 设置任务开始时间
        // 设置元素开始时间
        // 
    };
    this.执行_下一元素 = function() {
        // return this.BUF.UID;
    };
    this.执行_周期 = function(时间) {
        // 播放 声音
        // 结束 元素 ( 运行 下一个 )
    };
    this.当前_任务 = function() {
        // return this.BUF.UID;
    };
    this.任务_开始时间 = function() {
        // return this.BUF.UID;
    };
    // 
    this.元素_开始时间 = function() {
        // return this.BUF.UID;
    };
    // 由于 任务剩下时间不足
    // 元素开始时刻不一定是从'0' 开始
    this.元素_起始时刻 = function() {
        // return this.BUF.UID;
    };
    // 
    // 
    this.当前_时间轴 = function() {
        // return this.BUF.UID;
    };
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
        // return this.BUF.UID;
    };
    // 
    // 角色 : 孩子 , 家长 , 管理员
    this.角色 = function() {
        // return this.BUF.GRO;
    };
    // 
    // 昵称 : 孩子昵称 , 家长称为
    this.昵称 = function() {
        // return this.BUF.JSON.name;
    };
    this.is管理员 = function() {
        return this.权限().indexOf('管理员') > -1;
    };
    this.save = function() { //
        // DAT.set_user(this.UID(), this.BUF);
        // 
        // 因为 user 每次登录都会更新到BUF
        // 所以不用保存到本地
        // 
    };
}
// 
const OBJ = {
    getByID: function(uid) {
        init();
        var b = BUF.getOne('user', uid);
        return new FUN(b);
        // 
    },
    getByBUF: function(b) {
        init();
        // 
        return new FUN(b);
    },
    孩子列表: function() {
        init();
        // 
        var ar1 = BUF.getBUF('user');
        var ar2 = [];
        for (var i in ar1) {
            var u = new FUN(ar1[i]);
            if (u.is孩子()) {
                ar2.push(u);
            }
        }
        return ar2;
    },
    孩子_好友列表: function() {
        init();
        // 按分数排序
        // 
        var ar1 = BUF.getBUF('user');
        var ar2 = [];
        for (var i in ar1) {
            var u = new FUN(ar1[i]);
            if (u.is孩子()) {
                ar2.push(u);
            } else if (u.is好友()) {
                ar2.push(u);
            }
        }
        ar2.sort(function(a, b) {
            return a.存款() > b.存款();
        });
        return ar2;
    },
    家长_孩子_好友列表: function() {
        init();
        // 
        var ar2 = BUF.getBUF('user');
        ar2.sort(function(a, b) {
            if (a.is家长()) return 5;
            if (a.is孩子()) return 0;
            if (a.is好友()) return -1;
        });
        return ar2;
    },
};
module.exports = OBJ;