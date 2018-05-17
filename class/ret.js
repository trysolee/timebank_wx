var LOG;
var APP;
var VAL;
var ST;
var My;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        LOG = require('./log');
        APP = getApp();
        VAL = APP.VAL;
        ST = require('./showtxt.js');
        My = require('./user_my.js');
        // 
        atFirst = false;
    }
}
// 
// 解析 : 服务器返回的数据 
// 
const RET = function(d) {
    init();
    // 
    // ST.showJson(d);
    // return;
    // TODO
    // 
    // 判断服务器返回状态
    // 
    var OPT = d.OPT;
    //
    if (!OPT) {
        LOG({
            VAL: VAL.服务器连接失败, //
        });
    } else if (OPT.ERR) {
        ST.show(OPT.MSG);
        var err = OPT.ERR;
        if (err == '90') {
            // 
            LOG({
                VAL: VAL[OPT.MSG], //
            });
        }
    } else {
        if (OPT._SID) {
            APP.globalData.sessionid = OPT._SID;
        }
        if (OPT.supAdmin) {
            My.is超级管理员 = true;
        }
        if (OPT.Admin) {
            My.is系统管理员 = true;
        }
        if (OPT.freeBUF) {
            LOG({
                VAL: VAL.清空指定BUF, //
                DAT: OPT.freeBUF,
            })
        }
        if (OPT.INID) {
            LOG({
                VAL: VAL.返回邀请码, //
                DAT: OPT.INID,
            })
        }
        // 
        LOG({
            VAL: VAL.BUF, // 缓存数据
            DAT: d.DAT,
        })
        if (OPT.call) {
            LOG({
                VAL: VAL.后续call, //
                DAT: OPT.call,
            })
        }
        if (OPT.toPage) {
            LOG({
                // 更换 首页 , 
                // 1 . 不需要 清空 page stick
                // 因为 每个<页面> 都会有 <返回> 的描述
                // 
                VAL: {
                    PageJump: OPT.toPage,
                }
            })
        }
    }
};
module.exports = RET;