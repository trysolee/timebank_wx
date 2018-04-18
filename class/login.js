// const VAL = require('./val');
const LOG = require('./log');
const VAL = getApp().VAL;

const LOGIN = {
  GO: function () {

    // LOG({ VAL: VAL.TEST_ })  // 测试用
    // return;

    wx.login({
      success: function (loginResult) {
        LOG({ VAL: VAL.OK_WX_LOGIN }) // 微信登陆成功


        wx.getUserInfo({
          success: function (userResult) {

            LOG({
              VAL: VAL.OK_WX_GET_USER_INFO, // 获取用户数据成功
              DAT: userResult.userInfo,
            })

            wx.request({
              url: VAL.loginURL(),
              data: {
                code: loginResult.code,
                // en: userResult.encryptedData,
                // iv: userResult.iv,
              },
              success: function (res) {
                LOG({
                  VAL: VAL.OK_SERVER_LOGIN, // 服务器登录成功
                  DAT: res.data,
                })
              },

              fail: function (ret) {
                LOG({ VAL: VAL.ERR_SERVER_LOGIN }) // 服务器登录失败
              },

              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
            })

          },

          fail: function (userError) {
            LOG({ VAL: VAL.ERR_WX_GET_USER_INFO }) // 获取微信用户信息失败

          },
        });
      },

      fail: function (loginError) {

        LOG({ VAL: VAL.ERR_WX_LOGIN_FAILED }) // 微信登录失败

      },
    });
  },

};

module.exports = LOGIN;


// const VAL = require('./val');