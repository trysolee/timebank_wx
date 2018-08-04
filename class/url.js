// // 
const A = getApp();
// 
const path = function() {
    // 
    if (A.SYS.测试) {
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
        login: true,
        dat: {
            // code: ['code', null, false],
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
            T: ['剩下时间', null, false], //
        },
    },
    任务取消: { // 暂时 借用<提款取消>
        url: path() + 版本 + '9_takeback_cancle.php',
        dat: {
            UID: ['UID', null, false],
        },
    },
    // 
    提款结束: {
        url: path() + 版本 + '9_takeback_end.php',
        dat: {
            UID: ['UID', null, false],
            T: ['用掉的时间', null, false], //
        },
    },
    // 
    提款取消: {
        url: path() + 版本 + '9_takeback_cancle.php',
        dat: {
            UID: ['UID', null, false],
        },
    },
    // 
    更新孩子数据: {
        url: path() + 版本 + '9_update.php',
        dat: {},
    },
    添加孩子: {
        url: path() + 版本 + '5_add_c.php',
        dat: {
            h_NA: ['input_name', null, false],
        },
    },
    添加家长: {
        url: path() + 版本 + '9_add_m.php',
        dat: {
            // code: ['code', null, false], // 
            JID: ['JID', null, false], // 家庭ID
            j_na: ['input_name', null, false], // 昵称
        },
    },
    家长_改密码: {
        url: path() + 版本 + '5_fix_mm.php',
        dat: {
            UID: ['UID', null, false], //
            m: ['短密', null, false], // 昵称
        },
    },
    家长_改名: {
        url: path() + 版本 + '5_rename.php',
        dat: {
            UID: ['UID', null, false], //
            NA: ['家长称为', null, false], // 昵称
        },
    },
    孩子_改名: {
        url: path() + 版本 + '5_rename.php',
        dat: {
            UID: ['UID', null, false], //
            NA: ['孩子昵称', null, false], // 昵称
        },
    },
    // 
    创建家庭: {
        url: path() + 版本 + '9_login_in.php',
        login: true,
        dat: {
            // 孩子名称
            h_NA: ['h_name', null, false],
            // 家长名称
            j_NA: ['j_name', null, false],
            // 年级
            LJ: ['LJ', null, false],
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
            A.LOG({
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
            A.LOG({
                VAL: {
                    PageJump: pb,
                }
            })
        }
    },
    post: function(n) {
        var o = arr[n];
        if (!o) {
            A.ST.show('URL 不存在');
            return;
        }
        if (o.login) { // 需要 获取<微信code>
            if (A.SYS.非正式测试) {
                A.PAGE.set('_CODE_', A.SYS.测试用户);
                // 
                this.post_(o);
                return;
            }
            // 
            // 
            A.PAGE.set('url_obj', o);
            // 
            A.ST.show('获取微信登录');
            // 
            wx.login({
                success: function(loginResult) {
                    A.LOG({
                        _VAL: '微信登录_成功',
                        DAT: {
                            code: loginResult.code,
                        }
                    }); // 微信登陆成功
                    // 
                    //  避免 上面的<LOG>执行延迟
                    //  重新连接<post_> 在<微信登录_成功>里面执行
                },
                fail: function(loginError) {
                    A.LOG({
                        _VAL: '微信登录_失败'
                    }) // 微信登录失败
                },
            });
            return;
        }
        // 
        this.post_(o);
    },
    post_: function(o) {
        // 
        var d = [];
        var dat = o.dat;
        var v, vn, fun, nullOK;
        // 
        if (o.login) {
            d['code'] = A.PAGE.get('_CODE_');
        }
        // 
        if (dat)
            for (var i in dat) {
                vn = dat[i][0];
                fun = dat[i][1];
                nullOK = dat[i][2];
                // 
                v = A.PAGE.get(vn);
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
                        A.ST.show(i + ' 不能null ');
                        return;
                    }
                }
            }
        // 
        if (A.globalData.sessionid) {
            d._SID = A.globalData.sessionid;
        }
        // 
        A.LOG({
            _VAL: '连接_发送'
        });
        wx.request({
            url: o.url,
            data: d,
            success: function(res) {
                A.LOG({
                    // 触发 <连接_成功> 或 <连接_成功_但有ERR>
                    _VAL: '返回OK', // 服务器返回成功
                    DAT: res.data,
                });
            },
            fail: function(ret) {
                A.LOG({
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