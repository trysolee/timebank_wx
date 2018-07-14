// const VAL = require('./val');
var LOG;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        LOG = require('./log');
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
                    _VAL: '微信登录_成功'
                }) // 微信登陆成功
                wx.getUserInfo({
                    success: function(userResult) {
                        LOG({
                            _VAL: '获取微信用户信息成功', // 获取用户数据成功
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
                            _VAL: '获取微信用户信息失败'
                        }) // 获取微信用户信息失败
                    },
                });
            },
            fail: function(loginError) {
                LOG({
                    _VAL:'微信登录_失败'
                }) // 微信登录失败
            },
        });
    },
    // 
};
module.exports = LOGIN;
// const VAL = require('./val');