// // 
const A = getApp();
// 
// const 版本 = 'a';
const 版本 = 'tb';
// 
const arr = {
    登录: {
        url: '9_login.php',
        login: true,
        dat: {
            // code: ['code', null, false],
        },
    },
    CS更新: {
        url: '9_cs_dat.js',
    },
    // 
    修改存款: {
        url: '9_fix_money.php',
        dat: {
            UID: ['UID', 'ID', false],
            m: ['money', '实数', false], //
        },
    },
    // 
    发出邀请: {
        url: '二维码B',
        dat: {
            scene: ['JID', 'ID', false],
            page: ['page接受邀请', null, false], //
        },
    },
    // 
    任务结束: {
        url: '9_mission_end.php',
        dat: {
            UID: ['UID', 'ID', false],
            T: ['剩下时间', '整数', false], //
        },
    },
    任务取消: { // 暂时 借用<提款取消>
        url: '9_takeback_cancle.php',
        dat: {
            UID: ['UID', 'ID', false],
        },
    },
    // 
    提款结束: {
        url: '9_takeback_end.php',
        dat: {
            UID: ['UID', 'ID', false],
            T: ['用掉的时间', '正整数', false], //
        },
    },
    // 
    提款取消: {
        url: '9_takeback_cancle.php',
        dat: {
            UID: ['UID', 'ID', false],
        },
    },
    // 
    添加孩子: {
        url: '5_add_c.php',
        dat: {
            h_NA: ['input_name', '昵称', false],
        },
    },
    添加好友: {
        url: '9_add_f.php',
        dat: {
            id: ['好友邀请码', '邀请码', false],
        },
    },
    加入家庭: {
        url: '9_login_in_old.php',
        login: true,
        dat: {
            j_NA: ['家长称为', '昵称', false],
            invite: ['家长邀请码', '邀请码', false],
        },
    },
    // 
    获取家长邀请码: {
        url: '9_login_get.php',
        dat: {},
    },
    // 
    获取好友邀请码: {
        url: '9_add_f_get.php',
        dat: {},
    },
    家长_改密码: {
        url: '5_fix_mm.php',
        dat: {
            UID: ['UID', 'ID', false], //
            m: ['短密', '短密', false], // 昵称
        },
    },
    家长_改名: {
        url: '5_rename.php',
        dat: {
            UID: ['UID', 'ID', false], //
            NA: ['家长称为', '昵称', false], // 昵称
        },
    },
    孩子_改名: {
        url: '5_rename_c.php',
        dat: {
            UID: ['UID', 'ID', false], //
            NA: ['孩子昵称', '昵称', false], // 昵称
        },
    },
    删除孩子: {
        url: '5_del_c.php',
        dat: {
            UID: ['UID', 'ID', false], //
        },
        backCall: function(isOk) {
            // 
            //  服务器会更新数据
            // 
            // if (isOk) {
            //     var uid = A.PAGE.get('UID');
            //     A.BUF.delOne('user', uid);
            // }
        },
    },
    删除家长: {
        url: '5_del_h.php',
        dat: {
            UID: ['UID', 'ID', false], //
        },
        backCall: function(isOk) {
            // 
            //  服务器会更新数据
            // 
            // if (isOk) {
            //     var uid = A.PAGE.get('UID');
            //     A.BUF.delOne('user', uid);
            // }
        },
    },
    注销自己: {
        url: '9_login_off.php',
        dat: {
            UID: ['UID', 'ID', false], //
        },
        backCall: function(isOk) {
            // 
            //  服务器会更新数据
            // 
            // if (isOk) {
            //     var uid = A.PAGE.get('UID');
            //     A.BUF.delOne('user', uid);
            // }
        },
    },
    // 
    创建家庭: {
        url: '9_login_in.php',
        login: true,
        dat: {
            // 孩子名称
            h_NA: ['h_name', '昵称', false],
            // 家长名称
            j_NA: ['j_name', '昵称', false],
            // 年级 // 改年龄了
            LJ: ['LJ', '年龄', false],
        },
    },
    // 
    获取项目的全部人员: {
        url: '5_get_pro_all_user.php',
        dat: {},
    },
    // 
    修改分组人员权限: {
        url: '5_fix_group.php',
        dat: {
            ARR: ['ARR', null, false],
        },
    },
    // 
    系统管理员列表: {
        url: '1_get_sys_admin.php',
        dat: {},
    },
    // 
    系统管理员设置: {
        url: '1_set_sys_admin.php',
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
var urlOBJ = null;
// 
const OBJ = {
    setBackCall: function(fun) {
        backCall = fun;
    },
    setPageBack: function(page) {
        pageBack = page;
    },
    execBackCall: function(ok) {
        if (urlOBJ.backCall) {
            urlOBJ.backCall(ok);
        }
        urlOBJ = null;
        // 
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
            if (A.SYS.测试用户) {
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
        urlOBJ = o;
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
                    if (fun) {
                        if (!A.INPUT[fun].chk(v)) {
                            A.ST.show(vn + ' : ' + A.INPUT[fun].msg());
                            return;
                        }
                    }
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
            // url: o.url,
            url: A.SYS.post_URL(o.url),
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
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
                // 'content-type': 'application/json;charset=utf8'
            },
        })
    }
};
module.exports = OBJ;