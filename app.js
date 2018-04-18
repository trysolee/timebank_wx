
var USER = require('class/user');

var sys = require('class/sys');



const VAL = {

  TEST_: {
    TXT: '通用测试',

  },

  GO_LOGIN: {
    TXT: '登陆...',
    FUN: function (DAT) {


      LOGIN.GO();
      //

    },
  },

  OK_WX_LOGIN: {

    TXT: '微信登陆成功',
 
  },

  OK_WX_GET_USER_INFO: {

    TXT: '获取微信用户信息成功',
    FUN: function (DAT) {

      ST.showJson(DAT); // 测试用

      getApp().globalData.userInfo = DAT;
      //

    },
  },

  OK_SERVER_LOGIN: {

    TXT: '服务器登录成功',
    FUN: function (DAT) {

      ST.showJson(DAT); // 测试用
      //

    },
  },

  OK_SERVER_RET: {

    TXT: '服务器返回数据',
    FUN: function (DAT) {

      //

    },
  },

  ERR_NOT_Invitation: {

    TXT: '还没被邀请',
    FUN: function (DAT) {

      //

    },
  },

  ERR_WX_LOGIN_FAILED: {

    TXT: '微信登录失败',
    FUN: function (DAT) {

      //

    },
  },

  ERR_WX_GET_USER_INFO: {

    TXT: '获取微信用户信息失败',
    FUN: function (DAT) {

      //

    },
  },

  ERR_SERVER_LOGIN: {

    TXT: '服务器登陆失败',
    FUN: function (DAT) {

      //

    },
  },




  loginURL: function () {
    return 'http://192.168.31.199/login.php';
    // return 'http://192.168.31.199/test.php';
  }

};

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({//   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  VAL: VAL,

  globalData: {
    userInfo: null,

    user: new USER(),

  }
})



// const ST = require('class/showtxt.js');
const LOGIN = require('class/login.js');
const RET = require('class/ret.js');
const ST = require('class/showtxt.js');