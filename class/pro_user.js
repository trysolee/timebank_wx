var SYS;
var BUF;
var PRO;
var USER;
var MY;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        SYS = require('./sys');
        BUF = require('./buf');
        PRO = require('./project');
        USER = require('./user');
        MY = require('./user_my');
    }
}
// 
function sortJID(a, b) {
    return a.JID - b.JID;
}
// 
// 创建<对象>时 , 把整个<BUF>引用过来
// <修改> 和<读取> 直接操作<BUF>
// 
const FUN = function() {
    this.BUF = null;
    this.setBUF = function(buf) {
        this.BUF = buf;
    }
    this.JID = function() {
        return this.BUF.JID;
    };
    this.UID = function() {
        return this.BUF.UID;
    };
    this.分组 = function() {
        return this.BUF.GRO;
    };
    this.组内名 = function() {
        return this.BUF.JSON.name;
    };
    this.权限 = function() {
        return this.BUF.JSON.role;
    };
    this.邀请人 = function() {
        return USER.getByID(this.UID());
    };
    this.项目 = function() {
        return PRO.getByID(this.JID());
    };
    this.is管理员 = function() {
        return this.权限().indexOf('管理员') > -1;
    };
    // 
    // 返回 pro_all_user 时才有
    this.用户名 = function() {
        return this.BUF.name;
    };
}
// 
const OBJ = {
    getByBUF: function(b) {
        init();
        // 
        var o = new FUN();
        o.setBUF(b);
        return o;
    },
    // 
    findByID: function(JID, 分组) {
        init();
        // 
        var arr = BUF.getBUF('pro_user');
        // 
        for (var i = 0; i < arr.length; i++) {
            var o = this.getByBUF(arr[i]);
            // 
            if (JID == o.JID() // 
                && 分组 == o.分组()) {
                return o;
            }
        }
    },
    // 
    // 返回 列表用arr
    list: function() {
        init();
        // 
        var arr1 = BUF.getBUF('pro_user');
        var arr = arr1.sort(sortJID);
        var li = [];
        var jid = -10;
        var j;
        // 
        for (var i = 0; i < arr.length; i++) {
            var o = this.getByBUF(arr[i]);
            var s1 = '';
            var s2 = '';
            if (MY.is当前项目(o.JID())) {
                s1 = '# ';
                if (MY.is当前分组(o.分组())) s2 = '# ';
            }
            // 
            if (jid != o.JID()) {
                j = o.项目();
                li.push({
                    // primary
                    // default
                    // warn
                    type: 'default',
                    fun: '项目',
                    na: s1 + j.项目名(),
                    项目名: j.项目名(),
                    JID: o.JID(),
                });
                jid = o.JID();
            }
            // 
            li.push({
                type: 'primary',
                fun: '分组',
                na: s2 + j.分组名(o.分组()),
                分组名: j.分组名(o.分组()),
                项目名: j.项目名(),
                JID: o.JID(),
                分组: o.分组(),
                管理员: o.is管理员(),
                权限: o.权限(),
            });
            // 
        }
        return li;
    },
    // 
    // <管理员> 调整 <项目.分组.user>权限时,
    // 返回 全部成员
    list_pro_all: function() {
        init();
        var arr = BUF.getBUF('pro_all_user');
        var li = [];
        for (var i = 0; i < arr.length; i++) {
            var o = this.getByBUF(arr[i]);
            // 
            li.push({
                type: 'primary',
                fun: '分组',
                na: o.用户名(),
                UID: o.UID()
            });
            // 
        }
        return li;
    }
};
// 
// 
module.exports = OBJ;