var SYS;
var ST;
var PAGE;
var APP;
var VAL;
var LOG;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        SYS = require('./sys');
        ST = require('./showtxt.js');
        PAGE = require('./page');
        APP = getApp();
        VAL = APP.VAL;
        LOG = require('./log');
        // 
        atFirst = false;
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
        }
    },
    变更项目_分组: {
        url: path() + 版本 + '9_chg_group.php',
        dat: {
            JID: ['JID', null, false],
            group: ['分组', null, false],
        }
    },
    // 
    设置管理员: {
        url: path() + 版本 + '1_set_sys_admin.php',
        dat: {
            UID: ['UID', null, false],
        }
    },
    免除管理员: {
        url: path() + 版本 + '1_remove_sys_admin.php',
        dat: {
            UID: ['UID', null, false],
        }
    },
    // 
    // 
    修改项目名称: {
        url: path() + 版本 + '1_fix_project_name.php',
        dat: {
            name: ['input_name', null, false],
        }
    },
    新建项目: {
        url: path() + 版本 + '1_new_project.php',
        dat: {
            pro_name: ['input_name', null, false],
        }
    },
    // 
    修改分组名称: {
        url: path() + 版本 + '5_fix_group_name.php',
        dat: {
            name: ['input_name', null, false],
        }
    },
    // 
    获取项目的全部人员: {
        url: path() + 版本 + '5_get_pro_all_user.php',
        dat: {}
    },
};
// 
var pageBack = false;
// 
const OBJ = {
    setPageBack: function() {
        pageBack = true;
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
        wx.request({
            url: o.url,
            data: d,
            success: function(res) {
                LOG({
                    _VAL: '返回OK', // 服务器返回成功
                    DAT: res.data,
                });
                if (pageBack) {
                    pageBack = false;
                    LOG({
                        _VAL: 'pageBack',
                    })
                }
            },
            fail: function(ret) {
                LOG({
                    VAL: VAL.服务器连接失败
                }) // 服务器登录失败
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
        })
    }
};
module.exports = OBJ;