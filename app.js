// 
//app.js
App({
    // 
    onLaunch: function() {},
    globalData: {
        userInfo: null,
        // user: new USER(),
    },
});
// 
var A = getApp();
// 
A.REC = require('class/recorder');
A.A_PLAY = require('class/play_audio');
// 
A.SYS = require('class/sys');
A.LOG = require('class/log');
A.LOGIN = require('class/login.js');
A.ST = require('class/showtxt.js');
A.RET = require('class/ret');
// 
A.BUF = require('class/buf');
A.Url = require('class/url');
A.INPUT = require('class/input');
A.DAT = require('class_tb/s_dat');
A.PAGE = require('class/page');
A.VAL = require('class/val');
A.SHOW_CODE = require('class/show_code');
// 
A.USER = require('class/user');
A.My = require('class/user_my');
// 
A.MISSION = require('class_tb/c_mission');
A.ELEMENT = require('class_tb/c_element');
A.SOUND = require('class_tb/c_sound');
A.TAKEBACK = require('class_tb/c_takeback');
A.PLAY = require('class_tb/c_play');
A.FUN = require('class_tb/s_fun');
A.FIRST = require('class_tb/s_first');
// 
// A.CS = require('class_tb/cs');
// A.CS.检查版本();
// 
const CS版本 = 14;
const 检查版本 = function() {
    // var A = getApp();
    var s = 'CS版本';
    var v = A.DAT.get_SYS(s);
    if (v == CS版本) return;
    // 
    // 
    var CS = require('class_tb/cs');
    CS.更新();
    // 
    A.DAT.set_SYS(s, CS版本);
};
检查版本();