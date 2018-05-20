const SYS = require('class/sys');
const USER = require('class/user');
const BUF = require('class/buf');
const PAGE = require('class/page');
// 
const VAL = {
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
    系统管理员: {
        PageJump: '项目列表',
    },
    // 
    转到其他项目: {
        PageJump: '项目列表',
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
    修改项目名称: {
        FUN: function(DAT) {
            PAGE.set('_URL', '修改项目名称');
            PAGE.set('OKkey_name', '修改项目名');
            var n = PAGE.get('项目名');
            PAGE.set('name', n);
        },
        PageJump: '修改项目名称',
    },
    修改分组名称: {
        FUN: function(DAT) {
            PAGE.set('_URL', '修改分组名称');
            PAGE.set('OKkey_name', '修改分组名');
            var n = PAGE.get('分组名');
            PAGE.set('name', n);
        },
        // Jump 到 同一页  , 但有不同的 _URL
        PageJump: '修改项目名称',
    },
    //
    // 显示出 <项目.分组>
    // 和 全部成员名称
    修改分组权限: {},
    //
    // 显示 成员 及 全部权限( 包括 未授权的 )
    显示成员权限: {
        // TODO
    },
    进入分组: {
        // 变更当前<项目.分组>
        // 
        url: '变更项目_分组',
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
                    VAL: VAL[DAT[i]], //
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
            PAGE.callBack();
        },
    },
};
//app.js
App({
    onLaunch: function() {},
    VAL: VAL,
    Url: Url,
    globalData: {
        userInfo: null,
        // user: new USER(),
    },
});
// const ST = require('class/showtxt.js');
const LOGIN = require('class/login.js');
const RET = require('class/ret.js');
const ST = require('class/showtxt.js');
const LOG = require('class/log');
const Url = require('class/url');