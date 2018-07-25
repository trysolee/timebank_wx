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
// const 版本 = 'a';
const 版本 = 'tb';
// 
const arr = {
    登录: {
        url: path() + 版本 + '9_login.php',
        dat: {
            code: ['code', null, false],
        },
    },
    // 
    修改存款: {
        url: path() + 版本 + '9_fix_money.php',
        dat: {
            UID: ['UID', null, false],
            m: ['money', null, false], //
        },
    },
    // 
    更新执行包: {
        url: path() + 版本 + '9_up_exec.php',
        dat: {
            UID: ['UID', null, false],
            JSON: ['m_box', null, false], // 执行包
        },
    },
    // 
    任务结束: {
        url: path() + 版本 + '9_mission_end.php',
        dat: {
            UID: ['UID', null, false],
            T: ['用掉的时间', null, false], //
        },
    },
    // 
    提款结束: {
        url: path() + 版本 + '9_takeback_end.php',
        dat: {
            UID: ['UID', null, false],
            T: ['剩下时间', null, false], //
        },
    },
    // 
    更新孩子数据: {
        url: path() + 版本 + '9_update.php',
        dat: {},
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
const toObj = ['ARR', 'ARR1', 'JSON'];
// 
// 
var backCall = null;
var pageBack = null;
// 
const OBJ = {
    setBackCall: function(fun) {
        backCall = fun;
    },
    setPageBack: function(page) {
        pageBack = page;
    },
    execBackCall: function(ok) {
        if (backCall) {
            var bc = backCall;
            backCall = null;
            LOG({
                _VAL: 'pageBackCall',
                DAT: {
                    backCall: bc,
                    OK: ok,
                }
            })
        }
    },
    goPageBack: function() {
        if (pageBack) {
            var pb = pageBack;
            pageBack = null;
            LOG({
                VAL: {
                    PageJump: pb,
                }
            })
        }
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
        LOG({
            _VAL: '连接_发送'
        });
        wx.request({
            url: o.url,
            data: d,
            success: function(res) {
                LOG({
                    // 触发 <连接_成功> 或 <连接_成功_但有ERR>
                    _VAL: '返回OK', // 服务器返回成功
                    DAT: res.data,
                });
            },
            fail: function(ret) {
                LOG({
                    _VAL: '连接_失败',
                })
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