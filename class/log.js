var ST;
var PAGE;
var Url;
var APP;
var VAL;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        ST = require('./showtxt.js');
        PAGE = require('./page');
        Url = require('./url');
        APP = getApp();
        VAL = APP.VAL;
        // 
        atFirst = false;
    }
}
// 
// 
var Running = false;
var ARR = [];
const LOG = function(a) {
    init();
    // 
    ARR.unshift(a);
    if (Running) return;
    Running = true;
    var d;
    while (ARR.length > 0) {
        d = ARR.pop();
        if (d.VAL) {
            if (d.VAL.TXT) ST.show(d.VAL.TXT);
            if (d.VAL.FUN) {
                // 如果 有 FUN , 就要确保有 DAT
                // 这样可以 通过FUN 设置 DAT 
                // 为 <url> 备用
                if (!d.DAT) {
                    d.DAT = [];
                }
                d.VAL.FUN(d.DAT);
            }
            if (d.VAL.url) {
                Url.post(d.VAL.url);
                // if (!d.DAT) d.DAT = [];
                // // 
                // if (APP.globalData.sessionid) {
                //     d.DAT._SID = APP.globalData.sessionid;
                // }
                // wx.request({
                //     url: d.VAL.url,
                //     data: d.DAT,
                //     success: function(res) {
                //         LOG({
                //             VAL: VAL.返回OK, // 服务器返回成功
                //             DAT: res.data,
                //         });
                //     },
                //     fail: function(ret) {
                //         LOG({
                //             VAL: VAL.服务器连接失败
                //         }) // 服务器登录失败
                //     },
                //     method: 'POST',
                //     header: {
                //         'content-type': 'application/x-www-form-urlencoded' // 默认值
                //     },
                // })
            }
            if (d.VAL.PageJump) {
                PAGE.open(d.VAL.PageJump);
            }
            // 
        } else if (d._URL) {
            Url.post(d._URL);
            // 
        } else if (d.ShowTxt) {
            ST.setFun(d.FUN);
        }
    }
    Running = false;
};
module.exports = LOG;