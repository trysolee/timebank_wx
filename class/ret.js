// 
const A = getApp();
// 
// 
// 解析 : 服务器返回的数据 
// 
const RET = function(d) {
    // 
    // 判断服务器返回状态
    // 
    var OPT = d.OPT;
    //
    if (!OPT) {
        A.LOG({
            _VAL: '服务器连接失败', //
        });
    } else if (OPT.ERR) {
        // 
        A.LOG({
            _VAL: '连接_成功_但有ERR', //
        });
        // 
        A.ST.show(OPT.MSG);
        var err = OPT.ERR;
        if (err == '90') {
            // 
            A.LOG({
                _VAL: OPT.MSG, //
            });
        }
    } else {
        if (OPT._SID) {
            A.globalData.sessionid = OPT._SID;
        }
        if (OPT.supAdmin) {
            A.My.is超级管理员 = true;
        }
        if (OPT.Admin) {
            A.My.is系统管理员 = true;
        }
        if (OPT.myJID) {
            A.My.家庭id = OPT.myJID;
        }
        if (OPT.freeBUF) {
            A.LOG({
                _VAL: '清空指定BUF', //
                DAT: OPT.freeBUF,
            })
        }
        if (OPT.INID) {
            A.LOG({
                _VAL: '返回邀请码', //
                DAT: OPT.INID,
            })
        }
        if (OPT.CS版本) {
            A.LOG({
                _VAL: 'CS版本', //
                DAT: OPT.CS版本,
            })
        }
        if (OPT.CS_DAT) {
            A.LOG({
                _VAL: 'CS_DAT', //
                DAT: OPT.CS_DAT,
            })
        }
        // 
        if (d.DAT) {
            A.LOG({
                _VAL: 'BUF', // 缓存数据
                DAT: d.DAT,
            })
        }
        if (OPT.call) {
            A.LOG({
                _VAL: '后续call', //
                DAT: OPT.call,
            })
        }
        if (OPT.好友邀请码) {
            A.PAGE.set('好友邀请码', OPT.好友邀请码);
            A.LOG({
                // 
                VAL: {
                    PageJump: '好友邀请码',
                }
            })
        }
        if (OPT.家长邀请码) {
            A.PAGE.set('家长邀请码', OPT.家长邀请码);
            A.LOG({
                // 
                VAL: {
                    PageJump: '家长邀请码',
                }
            })
        }
        // 
        A.LOG({
            _VAL: '连接_成功', //
        });
        // 
        if (OPT.toPage) {
            A.LOG({
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