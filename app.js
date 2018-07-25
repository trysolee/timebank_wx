// 
//app.js
App({
    LOGIN: null,
    ST: null,
    LOG: null,
    SYS: null,
    RET: null,
    // 
    BUF: null,
    PAGE: null,
    URL: null,
    DAT: null,
    // 
    MISSION: null,
    ELEMENT: null,
    SOUND: null,
    TAKEBACK: null,
    PLAY: null,
    FUN: null,
    FIRST: null,
    // 
    onLaunch: function() {
        var A = this;
        // 
        A.LOGIN = require('class/login.js');
        A.ST = require('class/showtxt.js');
        A.LOG = require('class/log');
        A.SYS = require('class/sys');
        A.RET = require('class/ret');
        // 
    },
    globalData: {
        userInfo: null,
        // user: new USER(),
    },
});