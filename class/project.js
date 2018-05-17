var SYS;
var BUF;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        SYS = require('./sys');
        BUF = require('./buf');
        //
        atFirst = false;
    }
}
// 
// 
// 创建<对象>时 , 把整个<BUF>引用过来
// <修改> 和<读取> 直接操作<BUF>
// 
const FUN = function(JID) {
    this.BUF = BUF.getBUF('projoct')[JID];
    //
    this.JID = function() {
        return this.BUF['JID'];
    };
    this.分组名 = function(分组) {
        return this.BUF['JSON'][分组]['name'];
    };
    this.项目名 = function() {
        return this.BUF['name'];
    };
}
// 
const OBJ = {
    项目权限: {
        监理: ['管理员', '监理巡查', '监理浏览', '监理维护'],
        甲方: ['管理员', '甲方巡查'],
        施工: ['管理员', '施工日常', '施工处理', '施工维护'],
        临时: ['管理员', '监理浏览'],
    },
    // 
    项目分组: ['监理', '甲方', '施工', '临时'],
    // 
    getByID: function(JID) {
        init();
        // 
        // body.
        // 
        return new FUN(JID);
    },
    // 
    // 返回 列表用arr
    list: function() {
        init();
        // 
        // body...
    },
};
// 
// 
module.exports = OBJ;