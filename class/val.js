var SYS;
var USER;
var BUF;
var PAGE;
var LOG;
var LOGIN;
var ST;
var RET;
// 
var atFirst = true;
const VAL = {
    init: function() {
        if (atFirst) {
            atFirst = false;
            // 
            SYS = require('./sys');
            USER = require('./user');
            BUF = require('./buf');
            PAGE = require('./page');
            LOG = require('./log');
            LOGIN = require('./login.js');
            ST = require('./showtxt.js');
            RET = require('./ret.js');
        }
    },
    // 
    TEST_: {
        TXT: '通用测试',
    },
    还没注册: {
        TXT: '还没注册',
        PageJump: '邀请码',
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
    微信登录失败: {
        TXT: '微信登录失败',
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
    GO_LOGIN: {
        TXT: '登陆...',
        FUN: function(DAT) {
            if (SYS.测试) {
                // LOGIN.serverGO('user');
                PAGE.set('code', SYS.测试用户);
                LOG({
                    _URL: '登录', //
                });
            } else {
                LOGIN.GO();
            }
        },
    },
    获取微信用户信息成功: {
        TXT: '获取微信用户信息成功',
        FUN: function(DAT) {
            ST.showJson(DAT); // 测试用
            getApp().globalData.userInfo = DAT;
            //
        },
    },
 
    // 
    发出邀请: {
        // TODO
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
            // ST.showJson(DAT); // 测试用
            //
        },
        PageJump: '首页',
    },
    返回OK: {
        TXT: '服务器返回数据',
        FUN: function(DAT) {
            RET(DAT);
        },
    },
    后续call: {
        FUN: function(DAT) {
            for (var i in DAT) {
                LOG({
                    _VAL: DAT[i], //
                })
            }
        },
    },
    清空指定BUF: {
        FUN: function(DAT) {
            for (var i in DAT) {
                BUF.freeBUF(DAT[i]);
            }
        },
    },
    // 处理接收到的数据
    BUF: {
        TXT: '缓存数据',
        FUN: function(DAT) {
            //
            BUF.jsonIN(DAT);
        },
    },
    ERR_NOT_Invitation: {
        TXT: '还没被邀请',
        FUN: function(DAT) {
            //
        },
    },
    ERR_WX_GET_USER_INFO: {
        TXT: '获取微信用户信息失败',
        FUN: function(DAT) {
            //
        },
    },
    服务器连接失败: {
        TXT: '服务器进水了',
    },
    pageBack: {
        FUN: function(DAT) {
            PAGE.pageObj()[DAT.pageBack](DAT.OK);
        },
    },
};
module.exports = VAL;
// const LOGIN = require('./login.js');