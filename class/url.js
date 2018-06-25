var SYS;
var ST;
var PAGE;
var APP;
var LOG;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        SYS = require('./sys');
        ST = require('./showtxt.js');
        PAGE = require('./page');
        LOG = require('./log');
        APP = getApp();
    }
}
// 
// 
const path = function() {
    init();
    // 
    if (SYS.测试) {
        return 'http://localhost/';
    } else {
        return 'http://localhost/';
    }
}
const 版本 = 'a';
// 
const arr = {
    登录: {
        url: path() + 版本 + '9_login.php',
        dat: {
            code: ['code', null, false],
        },
    },
    执行任务: {
        url: path() + 版本 + '9_chg_group.php',
        dat: {
            UID: ['UID', null, false],
            WID: ['WID', null, false], // 任务id
        },
    },
    // 
    更新孩子数据: {
        url: path() + 版本 + '1_fix_project_name.php',
        dat: {
            UID: ['UID', null, false],
        },
    },
    添加孩子: {
        url: path() + 版本 + '1_new_project.php',
        dat: {
            userName: ['input_name', null, false],
        },
    },
    // 
    创建家庭: {
        url: path() + 版本 + '5_fix_group_name.php',
        dat: {
            // 孩子名称
            h_name: ['h_name', null, false],
            // 家长名称
            j_name: ['j_name', null, false],
        },
    },
    // 
    获取项目的全部人员: {
        url: path() + 版本 + '5_get_pro_all_user.php',
        dat: {},
    },
    // 
    修改分组人员权限: {
        url: path() + 版本 + '5_fix_group.php',
        dat: {
            ARR: ['ARR', null, false],
        },
    },
    // 
    系统管理员列表: {
        url: path() + 版本 + '1_get_sys_admin.php',
        dat: {},
    },
    // 
    系统管理员设置: {
        url: path() + 版本 + '1_set_sys_admin.php',
        dat: {
            ARR: ['ARR', null, false],
        },
    },
};
const toObj = ['ARR', 'ARR1'];
// 
// primary
// default
// warn
const page返回后台 = function() {
    var po = PAGE.pageObj();
    po.setData({
        ready: false,
        Loading: true, // 按键设置
        keyType: 'default',
        BKeyTxt: '发送...',
    });
      ST.show('发送请求...');
}
const page返回前台 = function() {
    var po = PAGE.pageObj();
    po.setData({
        ready: true,
    });
}
const page设置错误键 = function() {
    var po = PAGE.pageObj();
    po.setData({
        ready: true,
        Loading: false, // 按键设置
        keyType: 'warn',
        BKeyTxt: '返回',
    });
}
// 
var pageBack = null;
// 
const OBJ = {
    setPageBack: function(fun) {
        pageBack = fun;
    },
    post: function(n) {
        init();
        // 
        var o = arr[n];
        if (!o) {
            ST.show('URL 不存在');
            return;
        }
        var d = [];
        var dat = o.dat;
        var v, vn, fun, nullOK;
        if (dat)
            for (var i in dat) {
                vn = dat[i][0];
                fun = dat[i][1];
                nullOK = dat[i][2];
                // 
                v = PAGE.get(vn);
                if (v) {
                    if (fun)
                        if (!fun(v)) return;
                    // 需要转换成JSON
                    if (toObj.indexOf(i) > -1) {
                        v = JSON.stringify(v);
                    }
                    d[i] = v;
                } else {
                    if (!nullOK) {
                        ST.show(i + ' 不能null ');
                        return;
                    }
                }
            }
        // 
        if (APP.globalData.sessionid) {
            d._SID = APP.globalData.sessionid;
        }
        // 
        page返回后台();
        wx.request({
            url: o.url,
            data: d,
            success: function(res) {
                LOG({
                    _VAL: '返回OK', // 服务器返回成功
                    DAT: res.data,
                });
                if (pageBack) {
                    var pb = pageBack;
                    pageBack = null;
                    LOG({
                        _VAL: 'pageBack',
                        DAT: {
                            pageBack: pb,
                            OK: true,
                        }
                    })
                }
                page返回前台();
            },
            fail: function(ret) {
                LOG({
                    _VAL: '服务器连接失败',
                }) // 服务器登录失败
                if (pageBack) {
                    var pb = pageBack;
                    pageBack = null;
                    LOG({
                        _VAL: 'pageBack',
                        DAT: {
                            pageBack: pb,
                            OK: false,
                        }
                    })
                }
                page设置错误键();
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
                // 'content-type': 'application/json;charset=utf8'
            },
        })
    }
};
module.exports = OBJ;