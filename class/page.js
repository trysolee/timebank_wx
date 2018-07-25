const ST = require('./showtxt.js');
var LOG;
var BUF;
var Url;
var USER;
var MY;
var MISSION;
var FIRST;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        Url = require('./url');
        LOG = require('./log');
        BUF = require('./buf');
        USER = require('./user');
        MY = require('./user_my');
        MISSION = require('../class_tb/c_mission');
        FIRST = require('../class_tb/s_first');
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
    声音测试: {
        url: '../list_chk/list_chk',
        返回: null, // 没有返回键
        datList: function() {
            var li = [{
                // primary
                // default
                // warn
                type: 'primary',
                na: '录音...',
                fun: '录音',
            }, {
                // primary
                // default
                // warn
                type: 'warn',
                na: '结束',
                fun: '结束',
            }, {
                // primary
                // default
                // warn
                type: 'primary',
                na: '回播',
                fun: '回播',
            }, {
                // primary
                // default
                // warn
                type: 'default',
                na: '播放web',
                fun: '播放',
            }, {
                // primary
                // default
                // warn
                type: 'default',
                na: '播放1',
                fun: '播放1',
            }];
            // TODO 
            // 只设置了<更多>键 , 
            // 帖子的列表还没有考虑
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        录音: function(dList, o) {
            REC.开始();
        },
        结束: function(dList, o) {
            REC.结束((res) => {
                console.log('recorder stop', res)
                PAGE.set('tempFilePath', res.tempFilePath)
            });
        },
        回播: function(dList, o) {
            PLAY.开始(PAGE.get('tempFilePath'));
        },
        播放: function(dList, o) {
            PLAY.开始('https://kfqlh.com/a3.mp3');
        },
        播放1: function(dList, o) {
            PLAY.开始('https://kfqlh.com/a1.m4a');
        },
    },
    首页: {
        url: '../list_chk/list_chk',
        标志: '首页',
        返回: null, // 没有返回键
        datList: function() {
            var li = [];
            var arr = USER.孩子列表();
            for (var i = 0; i < arr.length; i++) {
                var x = arr[i];
                li.push({
                    type: 'primary',
                    na: x.列表名称(),
                    pageJump: '任务列表',
                    UID: x.UID(),
                    _page_set_: ['UID'],
                })
            }
            li.push({
                // primary
                // default
                // warn
                type: 'default',
                na: '更多...',
                fun: '更多',
            })
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        更多: function(dList, o) {
            //  用于 下拉菜单的list
            var li = [];
            // 
            li.push({
                na: '排行榜',
                pageJump: '排行榜',
                // fun: '点击',
            });
            li.push({
                na: '家人列表',
                pageJump: '家人清单',
                // fun: '点击',
            });
            li.push({
                na: '添加好友',
                fun: '点击',
            });
            li.push({
                na: '添加家长',
                fun: '点击',
            });
            li.push({
                na: '添加孩子',
                fun: '点击',
            });
            return li;
        },
        // 
        // dList : 全部列表Arr
        // o : 被点击的obj
        // m : 被点击的 <下拉菜单>的obj
        点击: function(dList, o, m) {
            PAGE.pageObj().setData({
                ready: false,
                BKeyTxt: '请稍后...',
            });
            LOG({
                _URL: '变更项目_分组',
            });
        },
    },
    // 
    // 点击 '孩子' 后 
    // 更新数据
    // 再决定跳转到那一页
    任务列表: {
        url: '../list_chk/list_chk',
        返回: '上一页',
        载入数据url: '更新孩子数据',
        datList: function() {
            // 用于 列表的list
            // 
            var user = USER.getByID(PAGE.get('UID'));
            if (user.is任务中()) {
                PAGE.set('m_box', user.get执行包());
                PAGE.open('执行任务');
                return [];
            }
            // 
            var li = [
                // primary
                // default
                // warn
            ];
            // 
            var da = new Date();
            var 最近期的任务 = -1;
            var arr = MISSION.任务列表();
            for (var i in arr) {
                var x = arr[i];
                if (最近期的任务 < 0) {
                    if (x.未到时间段()) 最近期的任务 = i;
                }
                li.push({
                    type: 'default',
                    na: x.名称(),
                    // _URL: '执行任务', // TODO 
                    fun: '执行任务',
                    任务Na: x.名称(),
                    _page_set_: ['任务Na'],
                })
            }
            if (最近期的任务 < 0) 最近期的任务 = 0;
            li[最近期的任务].type = 'primary';
            if (最近期的任务 > 0) {
                li[最近期的任务 - 1].type = 'primary';
            }
            // 
            li.push({
                type: 'warn',
                na: '提款',
                // _URL: '执行任务', // TODO 
                // fun: '执行任务',
                // pageJump: '测试1',
                pageJump: '提款',
            })
            return li;
        },
        执行任务: function() {
            // 
            var m = MISSION.getByNa(PAGE.get('任务Na'));
            var b = m.创建_执行包();
            var user = USER.getByID(PAGE.get('UID'));
            user.set执行包(b);
            // 
            PAGE.set('m_box', b);
            PAGE.open('执行任务');
            Url.post('更新执行包');
            // 
            return null;
        },
    },
    // 
    提款列表: {
        url: '../list_chk/list_chk',
        返回: '上一页',
        // 载入数据url: '更新孩子数据',
        datList: function() {
            // 用于 列表的list
            // 
            var user = USER.getByID(PAGE.get('UID'));
            var 存款 = user.存款();
            // 
            var li = [
                // primary
                // default
                // warn
            ];
            //           
            var arr = TAKEBACK.任务列表();
            for (var i in arr) {
                var x = arr[i];
                var t = 'default';
                if (x.预留存款() < 存款) {
                    t = 'primary';
                }
                li.push({
                    type: t,
                    na: x.名称(),
                    // _URL: '执行任务', // TODO 
                    fun: '执行任务',
                    任务Na: x.名称(),
                    _page_set_: ['任务Na'],
                })
            }
            return li;
        },
        执行任务: function() {
            // 
            var m = TAKEBACK.getByNa(PAGE.get('任务Na'));
            var user = USER.getByID(PAGE.get('UID'));
            if (user.存款() < m.预留存款()) {
                ST.showtxt('存款不足' + m.预留存款());
                return null;
            }
            var b = m.创建_执行包();
            user.set执行包(b);
            // 
            PAGE.set('m_box', b);
            // PAGE.open('执行任务');
            Url.setPageBack('执行任务');
            Url.post('更新执行包');
            // 
            return null;
        },
    },
    执行任务: {
        url: '../run_time/run_time',
        返回: '首页',
    },
    提款: {
        url: '../get_time/get_time',
        返回: '首页',
    },
    排行榜: {
        url: '../list_chk/list_chk',
        返回: '上一页',
        datList: function() {
            var arr = USER.孩子_好友列表();
            var li = [];
            // 
            for (var i = 0; i < arr.length; i++) {
                var x = arr[i];
                var t = 'primary';
                if (x.is好友()) t = 'default';
                li.push({
                    type: t,
                    na: x.名称_存款(),
                })
            }
            return li;
        },
    },
    人员列表: {
        url: '../list_chk/list_chk',
        返回: '上一页',
        datList: function() {
            var arr = USER.家长_孩子_好友列表();
            var li = [];
            // 
            for (var i = 0; i < arr.length; i++) {
                var x = arr[i];
                var t = 'default';
                if (x.is孩子()) {
                    t = 'primary';
                    fun = '_孩子';
                }
                if (x.is好友()) {
                    t = 'primary';
                    fun = '_好友';
                }
                if (x.is家长()) {
                    t = 'primary';
                    fun = '_家长';
                }
                li.push({
                    type: t,
                    na: x.名称_存款(),
                    user: x,
                    _page_set_: ['UID'],
                })
            }
            return li;
        },
        // 
        _家长: function(dList, o) {
            // 
            var an = '设为管理员';
            var x = o.user;
            if (x.is管理员()) {
                an = '撤销管理员';
            }
            // 
            var li = [{
                na: '改称为',
                pageJump: '家长_改名',
            }, {
                na: '改密码',
                pageJump: '家长_改密码',
            }, {
                na: an,
                UID: x.UID(),
                _URL: '管理员_转换',
                _page_set_: ['UID'],
            }, {
                na: '删除',
                _URL: '删除家长',
                UID: x.UID(),
                _page_set_: ['UID'],
            }];
            // 
            return li;
        },
        // 
        _孩子: function(dList, o) {
            // 
            var li = [{
                na: '改昵称',
                pageJump: '孩子_改名',
            }, {
                na: '终止任务',
                pageJump: '终止任务',
            }, {
                na: '删除',
                _URL: '删除孩子',
                UID: x.UID(),
                _page_set_: ['UID'],
            }];
            // 
            return li;
        },
        // 
        _好友: function(dList, o) {
            // 
            var li = [{
                na: '删除',
                _URL: '删除好友',
                UID: x.UID(),
                _page_set_: ['UID'],
            }];
            // 
            return li;
        },
    },
    注册_孩子昵称: {
        url: '../fix_str/fix_str',
        返回: '首页',
        OK_page: '注册_家长称为',
        OK_name: '下一步',
        // 
        // 输入后 , 用'input_name'保存在page
        pageVN: 'h_name',
        getStr: function() {
            return '孩子昵称';
        },
        OK_fun: function(str) {},
    },
    注册_家长称为: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_URL: '创建家庭',
        OK_name: '注册',
        // 
        // 输入后 , 用'input_name'保存在page
        pageVN: 'j_name',
        getStr: function() {
            return '称为(爸爸,妈妈...)';
        },
        OK_fun: function(str) {},
    },
    测试1: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_name: '输入测试码',
        // 
        // 输入后 , 用'input_name'保存在page
        pageVN: 'input_name',
        getStr: function() {
            return '测试码';
        },
        OK_fun: function(str) {},
    },
    // 
    // TODO
    // 注册 孩子几年级
    // 
    // 
    添加孩子: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_URL: '添加孩子',
        OK_name: '添加孩子',
        // 
        // 输入后 , 用'input_name'保存在page
        pageVN: 'input_name',
        getStr: function() {
            return '孩子昵称';
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
// var BOX = [{
//     dat: {}
// }];
// 
// 由于 <打开页面> 需要等待 <onReady>异步处理
// 所以需要把 <当前page> 临时记录在<backup>里面
var backup = Page['测试1'];
// 
const PAGE = {
    open: function(p) {
        
        // 
        init();
        // 
        ST.reSet();
        // 
        var o = backup = Page[p];
        //
        if (o.标志 == '首页') {
            wx.reLaunch({
                url: o.url,
            })
        } else {
            wx.navigateTo({
                url: o.url,
            })
        }
    },
    // 
    pageBack: function() {
        var o = this.当前page();
        if (o.返回 == '上一页') {
            wx.navigateBack();
            // } else if (p.返回 == '首页') {
            //     this.open('首页');
        } else {
            var p = getCurrentPages();
            // i 从倒数第二page 开始 , 到 顺数第二page结束
            for (var i = p.length - 2; i >= 1; i--) {
                if (p[i]._BOX_.page.标志 == o.返回) return;
                wx.navigateBack();
            }
        }
    },
    // 
    当前page: function() {
        var box = this.pageObj()._BOX_;
        // if (!box) box = this.pageObj()._BOX_ = {};
        return box.page;
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
            if (typeof(v) != 'undefined') //
                return v;
        }
        return null;
    },
}
module.exports = PAGE;