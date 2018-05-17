// const VAL = require('./val');
var LOG;
var APP;
var VAL;
var URL;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        LOG = require('./log');
        APP = getApp();
        VAL = APP.VAL;
        URL = APP.Url;
        // 
        atFirst = false;
    }
}
// 
const LOGIN = {
    GO: function() {
        init();
        // 
        // 通过 <微信> 获取 code
        wx.login({
            success: function(loginResult) {
                LOG({
                    VAL: VAL.OK_WX_LOGIN
                }) // 微信登陆成功
                wx.getUserInfo({
                    success: function(userResult) {
                        LOG({
                            VAL: VAL.OK_WX_GET_USER_INFO, // 获取用户数据成功
                            DAT: userResult.userInfo,
                        });
                        // LOGIN.serverGO('user');
                        PAGE.set('code', loginResult.code);
                        LOG({
                            _URL: '登录', //
                        });
                        // LOGIN.serverGO(loginResult.code);
                    },
                    fail: function(userError) {
                        LOG({
                            VAL: VAL.ERR_WX_GET_USER_INFO
                        }) // 获取微信用户信息失败
                    },
                });
            },
            fail: function(loginError) {
                LOG({
                    VAL: VAL.ERR_WX_LOGIN_FAILED
                }) // 微信登录失败
            },
        });
    },
    // 
    // 通过<code> 连接服务器 , 登录
    serverGO: function(code) {
        wx.request({
            url: URL.登录,
            data: {
                code: code,
                // en: userResult.encryptedData,
                // iv: userResult.iv,
            },
            success: function(res) {
                LOG({
                    VAL: VAL.返回OK, // 服务器返回成功
                    DAT: res.data,
                });
                // LOG({
                //     VAL: VAL.登录OK, // 
                // });
            },
            fail: function(ret) {
                LOG({
                    VAL: VAL.ERR_SERVER_LOGIN
                }) // 服务器登录失败
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
        })
    }
};
module.exports = LOGIN;
// const VAL = require('./val');