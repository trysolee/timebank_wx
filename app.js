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
A.SYS = require('class/sys');
A.LOG = require('class/log');
A.LOGIN = require('class/login.js');
A.ST = require('class/showtxt.js');
A.RET = require('class/ret');
// 
A.BUF = require('class/buf');
A.Url = require('class/url');
A.DAT = require('class_tb/s_dat');
A.PAGE = require('class/page');
A.VAL = require('class/val');
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