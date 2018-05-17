
// 用 app 里面的 VAL
// 这里 的 val.js 暂时停用
//

const ST = require('./showtxt.js');
// const LOGIN = require('./login.js');

const VAL = {

  测试: true,


  TEST_: {
    TXT: '通用测试',

  },

  GO_LOGIN: {
    TXT: '登陆...',
    FUN: function (DAT) {

      // var LOGIN = require('./login.js');

      // LOGIN.GO();
      //

    },
  },

  OK_WX_LOGIN: {

    TXT: '微信登陆成功',
    FUN: function (DAT) {

      //

    },
  },

  OK_WX_GET_USER_INFO: {

    TXT: '获取微信用户信息成功',
    FUN: function (DAT) {

      //

    },
  },

  OK_SERVER_LOGIN: {

    TXT: '服务器登录成功',
    FUN: function (DAT) {

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
    // return 'http://192.168.31.199/a9_login.php';
    return 'http://localhost/a9_login.php';
  }

};

module.exports = VAL;

// const LOGIN = require('./login.js');