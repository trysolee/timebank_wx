// 
// 计划 取消
// 
// 
// 
const A = getApp();
// 
const LOGIN = {
    GO: function() {
        // 
        // 通过 <微信> 获取 code
        wx.login({
            success: function(loginResult) {
                A.LOG({
                    _VAL: '微信登录_成功'
                }) // 微信登陆成功
                wx.getUserInfo({
                    success: function(userResult) {
                        A.LOG({
                            _VAL: '获取微信用户信息成功', // 获取用户数据成功
                            DAT: userResult.userInfo,
                        });
                        // LOGIN.serverGO('user');
                        A.PAGE.set('code', loginResult.code);
                        A.LOG({
                            _URL: '登录', //
                        });
                        // LOGIN.serverGO(loginResult.code);
                    },
                    fail: function(userError) {
                        A.LOG({
                            _VAL: '获取微信用户信息失败'
                        }) // 获取微信用户信息失败
                    },
                });
            },
            fail: function(loginError) {
                A.LOG({
                    _VAL: '微信登录_失败'
                }) // 微信登录失败
            },
        });
    },
    // 
};
module.exports = LOGIN;
// const VAL = require('./val');