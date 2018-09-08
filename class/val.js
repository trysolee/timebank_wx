// 
const A = getApp();
// 
const VAL = {
    // 
    TEST_: {
        TXT: '通用测试',
    },
    // ----------------------
    // ----------------------
    // -------- 不同的<连接>状态触发
    // 
    连接_发送: {
        FUN: function(DAT) {
            // 
            // ------- 页面设为<等待> ---
            var po = A.PAGE.pageObj();
            po.setData({
                ready: false,
                Loading: true, // 按键设置
                keyType: 'default',
                BKeyTxt: '发送...',
            });
            A.ST.show('发送请求...');
            // 
            // 
        },
    },
    返回OK: {
        TXT: '服务器返回数据',
        FUN: function(DAT) {
            A.RET(DAT);
        },
    },
    连接_成功: {
        FUN: function(DAT) {
            // 
            // ------- 页面设为<连接结束.恢复> ---
            var po = A.PAGE.pageObj();
            po.setData({
                ready: true,
            });
            //
            A.Url.execBackCall(true);
            // 
            A.Url.goPageBack();
        },
    },
    连接_成功_但有ERR: {
        FUN: function(DAT) {
            // 
            // ------- 页面设为<连接结束.有异常> ---
            // 暂停在 提示页面
            var po = A.PAGE.pageObj();
            po.setData({
                ready: true,
                Loading: false, // 按键设置
                keyType: 'warn',
                BKeyTxt: '返回',
            });
            //
            A.Url.execBackCall(false);
            // 
        },
    },
    连接_失败: {
        TXT: '服务器进水了',
        // 
        FUN: function(DAT) {
            VAL.连接_成功_但有ERR.FUN(DAT);
        },
    },
    // ----------------------
    还没注册: {
        TXT: '还没注册',
        // PageJump: '邀请码',
        PageJump: '注册',
    },
    参数不全: {
        TXT: '参数不全',
        // TODO
        // 跳转到相应页面
        // 
    },
    权限错误: {
        TXT: '权限错误',
        // TODO
        // 跳转到相应页面
        // 
    },
    返回邀请码: {
        // 发出邀请后 , 
        // 服务器 产生并返回一个邀请码
        // TODO
        // 跳转到相应页面
        // 
    },
    微信登录_成功: {
        TXT: '微信登录成功',
        FUN: function(DAT) {
            // 
            // 微信登录 , 都是为了获取<code>用于<登录>
            // 所以<微信登录>后 , 需要继续<服务连接>
            A.PAGE.set('_CODE_', DAT.code);
            var o = A.PAGE.get('url_obj');
            A.Url.post_(o);
            // 
            // 
        },
    },
    微信登录_失败: {
        TXT: '微信登录失败',
    },
    获取微信用户信息成功: {
        TXT: '获取微信用户信息成功',
        FUN: function(DAT) {
            if (A.SYS.测试) {
                A.ST.showJson(DAT); // 测试用
            }
            getApp().globalData.userInfo = DAT;
        },
    },
    获取微信用户信息失败: {
        TXT: '获取微信用户信息失败',
    },
    // 
    发出邀请: {
        // TODO
    },
    // 
    任务结束: {
        FUN: function(DAT) {
            A.DAT.set_当前执行包('');
        },
    },
    // 
    提款结束: {
        FUN: function(DAT) {
            A.DAT.set_当前执行包('');
        },
    },
    // 
    地图: {
        // TODO
    },
    // 
    新帖子: {
        // TODO
    },
    // 判断 是否登录成功
    登录OK: {
        TXT: '服务器登录成功',
        FUN: function(DAT) {
            A.ST.showJson(DAT); // 测试用
            //
        },
        PageJump: '首页',
    },
    后续call: {
        FUN: function(DAT) {
            for (var i in DAT) {
                A.LOG({
                    _VAL: DAT[i], //
                })
            }
        },
    },
    清空指定BUF: {
        FUN: function(DAT) {
            for (var i in DAT) {
                A.BUF.freeBUF(DAT[i]);
            }
        },
    },
    // 处理接收到的数据
    BUF: {
        TXT: '缓存数据',
        FUN: function(DAT) {
            //
            A.BUF.jsonIN(DAT);
        },
    },
    ERR_NOT_Invitation: {
        TXT: '还没被邀请',
        FUN: function(DAT) {
            //
        },
    },
    服务器连接失败: {
        TXT: '服务器进水了',
    },
    // 
    pageBackCall: {
        FUN: function(DAT) {
            A.PAGE.pageObj()[DAT.backCall](DAT.OK);
        },
    },
    // 
};
module.exports = VAL;
// const LOGIN = require('./login.js');