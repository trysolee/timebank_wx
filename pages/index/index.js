//index.js
//获取应用实例
const app = getApp()

var localhost = 'http://192.168.31.199/login.php'

var link = {
  code_OK: false,
  IV_OK: false,
  hasGO: false,

  code: null,
  encryptedData : null,
  iv : null
}

function getUID() {
  if (!link.code_OK)
    return;

  if (!link.IV_OK)
    return;

  if (link.hasGO)
    return;

  link.hasGO = true;


  wx.request({
    url: localhost,
    data: {
      code: link.code,
      en : link.encryptedData,
      iv : link.iv
    },
    success: function (res) {
      console.log(res.data)
    },
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
  })
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {


    wx.login({
      success: function (loginResult) {
        wx.getUserInfo({
          success: function (userResult) {
            callback(null, {
              code: loginResult.code,
              encryptedData: userResult.encryptedData,
              iv: userResult.iv,
              userInfo: userResult.userInfo,
            });
          },

          fail: function (userError) {
            var error = new LoginError(constants.ERR_WX_GET_USER_INFO, '获取微信用户信息失败，请检查网络状态');
            error.detail = userError;
            callback(error, null);
          },
        });
      },

      fail: function (loginError) {
        var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态');
        error.detail = loginError;
        callback(error, null);
      },
    });

    
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          link.code = res.code;
          link.code_OK = true;
          getUID();

        } else {

          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {

        link.encryptedData = res.encryptedData;
        link.iv = res.iv;
        link.IV_OK = true;

        getUID();

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})
