// 
// 创建<对象>时 , 把整个<BUF>引用过来
// <修改> 和<读取> 直接操作<BUF>
// 
const FUN = function(B) {
    this.BUF = B;
    this.JID = function() { // 家庭ID
        return this.BUF.JID;
    };
    this.UID = function() {
        return this.BUF.UID;
    };
    // 
    // 如果是孩子 , 返回 true
    this.is孩子 = function() {
        // return this.BUF.UID;
    };
    // 
    //
    this.is好友 = function() {
        // return this.BUF.UID;
    };
    // 
    // 
    this.is家长 = function() {
        // return this.BUF.UID;
    };
    // 
    // 
    this.is管理员 = function() {
        // return this.BUF.UID;
    };
    // 
    // 正在执行任务
    this.is任务中 = function() {
        // return this.BUF.UID;
    };
    // 
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
    // 
    this.当前_元素 = function() {
        // return this.BUF.UID;
    };
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
    // 如果在任务中 , 就会有<剩下的时间>
    this.剩下的时间 = function() {
        // return this.BUF.UID;
    };
    // 
    // 用于列表
    // 1 . 无任务 ( 只显示昵称 )
    // 2 . 有任务 ( 显示剩余时间 )
    this.列表名称 = function() {
        // return this.BUF.UID;
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
}
// 
const OBJ = {
    getByID: function(b) {
        init();
        // 
    },
    getByBUF: function(b) {
        init();
        // 
        return FUN(b);
    },
    孩子列表: function() {
        //
    },
    孩子_好友列表: function() {
        // 按分数排序
        // 
    },
    家长_孩子_好友列表: function() {
        // 按分数排序
        // 
    },
};
module.exports = OBJ;