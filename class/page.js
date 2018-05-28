const ST = require('./showtxt.js');
var LOG;
var BUF;
var Url;
var PRO;
var PRO_USER;
var MY;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        Url = require('./url');
        LOG = require('./log');
        BUF = require('./buf');
        PRO = require('./project');
        PRO_USER = require('./pro_user');
        MY = require('./user_my');
    }
}
// 
// 
const Page = {
    // 接受邀请 , 输入二维码
    邀请码: {
        url: '../incode/incode',
        返回: null, // 没有返回键
    },
    首页: {
        url: '../list_chk/list_chk',
        返回: null, // 没有返回键
        datList: function() {
            var li = [{
                // primary
                // default
                // warn
                type: 'default',
                na: '更多...',
                fun: '更多',
            }];
            // TODO 
            // 只设置了<更多>键 , 
            // 帖子的列表还没有考虑
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        更多: function(dList, o) {
            //  用于 下拉菜单的list
            var li = [];
            // 
            li.push({
                na: '系统管理员',
                pageJump: '系统管理员',
                // fun: '点击',
            });
            li.push({
                na: '转到其他项目',
                pageJump: '项目列表',
                // fun: '点击',
            });
            li.push({
                na: '发出邀请',
                fun: '点击',
            });
            li.push({
                na: '新帖子',
                fun: '点击',
            });
            li.push({
                na: '地图',
                fun: '点击',
            });
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        // m : 被点击的 <下拉菜单>的obj
        点击: function(dList, o, m) {
            LOG({
                _VAL: m.na,
            })
        },
    },
    系统管理员: {
        url: '../list_chk/list_chk',
        返回: '上一页',
        datList: function() {
            var li = [];
            // 
            li.push({
                type: 'default',
                na: '新建项目',
                pageJump: '新建项目',
            });
            // 
            li.push({
                type: 'default',
                na: '设置系统管理员',
                pageJump: '设置系统管理员',
            });
            return li;
        },
    },
    新建项目: {
        url: '../fix_str/fix_str',
        返回: '首页',
        OK_URL: '新建项目',
        OK_name: '新建项目',
        pageVN: 'input_name',
        getStr: function() {
            return '项目名称';
        },
        OK_fun: function(str) {},
    },
    // 
    设置系统管理员: {
        LOAD_URL: '系统管理员列表',
        OK_URL: '系统管理员设置',
        OK_name: '设定系统管理员',
        url: '../list_sel/list_sel',
        // cla: 'list_sel',
        返回: '上一页',
        datList() {
            var UIDs = [];
            var admin = BUF.getBUF('sys_admin');
            var l = [];
            for (var i in admin) {
                l.push({
                    // primary
                    // default
                    // warn
                    type: 'primary',
                    na: admin[i].name,
                    name: admin[i].UID,
                    chk: true,
                });
                UIDs.push(admin[i].UID);
            }
            // 
            var user = BUF.getBUF('user');
            for (var i in user) {
                if (UIDs.indexOf(user[i].UID) < 0) //
                    l.push({
                        type: 'default',
                        na: user[i].name,
                        name: user[i].UID,
                        chk: true,
                    })
            }
            return l;
        },
        // 
        // arr : ['管理员','施工巡查']
        // list : [{type:'primary',na:'管理员'},{...}]
        OK_fun: function(arr, list) {
            PAGE.set('ARR', arr);
        },
    },
    帖子: {
        url: '../work/work',
        返回: '首页',
    },
    // 
    // 用于 转到其他项目
    项目列表: {
        // cla: 'list_chk',
        url: '../list_chk/list_chk',
        返回: '上一页',
        datList: function() {
            return PRO_USER.list();
        },
        // 
        项目: function(dList, o) {
            // 
            if (MY.系统权限() // 
                && MY.is当前项目(o.JID)) {
                // 
                PAGE.set('JID', o.JID);
                PAGE.set('项目名', o.项目名);
                //
                return [{
                    na: '修改项目名称',
                    pageJump: '修改项目名称',
                    // fun: '项目chk',
                }];
            }
            return [];
        },
        // 
        分组: function(dList, o) {
            PAGE.set('JID', o.JID);
            PAGE.set('分组', o.分组);
            PAGE.set('分组名', o.分组名);
            PAGE.set('项目名', o.项目名);
            // 
            var li = [];
            if (MY.is当前项目(o.JID) //
                && MY.is当前分组(o.分组) //
                && MY.分组权限(o.JID, o.分组)) {
                li.push({
                    na: '修改分组名称',
                    pageJump: '修改分组名称',
                });
                li.push({
                    na: '修改分组权限',
                    pageJump: '项目人员',
                });
            }
            li.push({
                na: '进入分组',
                fun: '进入分组',
            });
            // 
            return li;
        },
        // 
        // dList : 全部列表Arr
        // o : 被点击的obj
        // m : 被点击的 <下拉菜单>的obj
        进入分组: function(dList, o, m) {
            PAGE.pageObj().setData({
                ready: false,
                BKeyTxt: '请稍后...',
            });
            LOG({
                _URL: '变更项目_分组',
            });
        },
    },
    项目人员: {
        // cla: 'list_chk',
        url: '../list_chk/list_chk',
        返回: '上一页',
        载入数据url: '获取项目的全部人员',
        OK_URL: '修改分组人员权限',
        OK_name: '确定',
        OK_fun: function(dList) {
            var a = dList;
            var obj = {};
            for (var i in a) {
                var x = a[i];
                if (x.fun == 'menuList') //
                    obj[x.UID] = x.JSON.role;
            }
            PAGE.set('ARR', obj);
        },
        datList: function() {
            // 用于 列表的list
            var li = [{
                // primary
                // default
                // warn
                type: 'default',
                na: PAGE.get('项目名') + ' . ' + PAGE.get('分组名'),
            }];
            // 
            var a = BUF.getBUF('pro_all_user');
            for (var i in a) {
                var x = a[i];
                var n = x.JSON.name;
                var r = x.JSON.role;
                // 
                // 如果有权限( 没有被删除 )
                var t = 'primary'; // or 'warn'
                if (r.lenght < 1) {
                    t = 'warn';
                    n = '[ 删 ] ' + n;
                } else if (r.indexOf('管理员') != -1) {
                    n = n + ' [ 管 ]';
                }
                // 
                li.push({
                    type: t,
                    na: n,
                    name: x.JSON.name,
                    UID: x.UID,
                    JSON: x.JSON,
                    fun: 'menuList',
                })
            }
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        menuList: function(dList, o) {
            //  用于 下拉菜单的list
            var li = [];
            // 
            li.push({
                na: o.name,
                UID: o.UID,
                userName: o.name,
                JSON: o.JSON,
                fun: '点击',
            });
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        // m : 被点击的 <下拉菜单>的obj
        点击: function(dList, o, m) {
            PAGE.set('UID', m.UID);
            PAGE.set('userName', m.userName);
            PAGE.set('JSON', m.JSON);
            PAGE.open('人员权限');
        },
        单一直接执行: true,
    },
    // 
    // 
    // 
    人员权限: {
        url: '../list_sel/list_sel',
        // cla: 'list_sel',
        返回: '上一页',
        datList() {
            // var o = BUF.getOne('pro_all_user', PAGE.get('UID')).role;
            var o = PAGE.get('JSON').role;
            var l = [{
                // primary
                // default
                // warn
                type: 'default',
                na: PAGE.get('userName'),
            }];
            var a = PRO.项目权限[PAGE.get('分组')];
            for (var i = 0; i < a.length; i++) {
                var x = a[i];
                var t = 'default';
                var n = x;
                //
                if (o.indexOf(x) >= 0) {
                    t = 'primary';
                    n = n + ' Y';
                }
                l.push({
                    type: t,
                    na: n,
                    name: x,
                    chk: true,
                });
            }
            return l;
        },
        // 
        // arr : ['管理员','施工巡查']
        // list : [{type:'primary',na:'管理员'},{...}]
        OK_fun: function(arr, list) {
            var o = PAGE.get('JSON');
            o.role = arr;
        },
    },
    修改项目名称: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_URL: '修改项目名称',
        OK_name: '确定修改',
        pageVN: 'input_name',
        getStr: function() {
            return PAGE.get('项目名');
        },
        OK_fun: function(str) {
            //
        },
    },
    修改分组名称: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_URL: '修改分组名称',
        OK_name: '确定修改',
        pageVN: 'input_name',
        getStr: function() {
            return PAGE.get('分组名');
        },
        OK_fun: function(str) {
            //
        },
    },
};
var BOX = [{
    dat: {}
}];
// 
// 由于 <打开页面> 需要等待 <onReady>异步处理
// 所以需要把 <当前page> 临时记录在<backup>里面
var backup = null;
// 
const PAGE = {
    open: function(p) {
        init();
        // 
        ST.reSet();
        // 
        var o = backup = Page[p];
        //
        var u = o.url;
        // 
        // 只有<返回> : null 
        // 用 重新开始
        // 其他 都用 <navigateTo>
        if (o.返回 == '上一页') {
            wx.navigateTo({
                url: u,
            })
        } else if (!o.返回) {
            BOX = [];
            wx.reLaunch({
                url: u,
            })
        } else {
            wx.navigateTo({
                url: u,
            })
            // wx.redirectTo({
            //     url: u,
            // })
        }
        // 
    },
    // 
    pageBack: function() {
        var p = this.当前page();
        if (p.返回 == '上一页') {
            wx.navigateBack();
        } else if (p.返回 == '首页') {
            this.open('首页');
        } else if (p.返回 == '后退') {
            wx.navigateBack({
                delta: p.后退页数
            })
        }
    },
    // 
    // getPageCla: function(name) {
    //     return CLA[name];
    // },
    // // 
    // 当前cla: function() {
    //     return this.pageObj()._BOX_.cla;
    // },
    // 
    当前page: function() {
        return this.pageObj()._BOX_.page;
    },
    // 
    pageObj: function() {
        var p = getCurrentPages();
        var l = p.length;
        return p[l - 1];
    },
    // 
    ready: function() {
        //  页面 ready 
        //  可以启动预设程序
        //  
        // var o = backup;
        var op = this.pageObj();
        var box = op._BOX_ = {
            page: backup,
            dat: {},
        };
        // 
        // var cla = CLA[o.cla];
        // if (cla) {
        //     box.cla = cla;
        //     cla.fun();
        // }
    },
    //   
    // 设置 数值
    set: function(n, v) {
        init();
        var op = this.pageObj();
        if (op._BOX_) {
            op._BOX_.dat[n] = v;
        } else {
            var d = {};
            d[n] = v;
            op._BOX_ = {
                dat: d,
            };
        }
    },
    get: function(n) {
        init();
        var p = getCurrentPages();
        var l = p.length - 1;
        for (var i = l; i >= 0; i--) {
            if (!p[i]._BOX_) continue;
            var v = p[i]._BOX_.dat[n];
            if (v) return v;
        }
        return null;
    },
}
module.exports = PAGE;