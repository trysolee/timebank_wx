// 
// 
var MISSION;
var FUN;
var DAT;
var _SYS;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        MISSION = require('./c_mission');
        FUN = require('./s_fun');
        DAT = require('./s_dat');
        _SYS = require('../class/sys');
    }
}
// 
// 元素
const CLA = function(B) {
    // 
    init();
    // 
    this.BUF = B;
    this.播放OK = false;
    this.继续exec = true;
    // 
    this.getBUF = function() { // 
        return this.BUF.DAT;
    };
    // 
    // 
    this.时刻 = 0;
    this.set时刻 = function(s) { // 
        this.时刻 = s;
    };
    this.get时刻 = function() { // 
        return this.时刻;
    };
    //
    //  
    this.名称 = function() { // 声音名称
        return this.BUF.Na;
    };
    this.exec = function(执行包_dat, 元素) {
        // 
        var arr = this.BUF.exec;
        // 
        for (var i = 0; i < arr.length; i++) {
            var f = arr[i].fun;
            var d = arr[i].dat;
            // 
            FUN[f](执行包_dat, 元素, this, d);
            // 
            if (!this.继续exec) {
                break;
            }
        }
        this.save();
        // 
        return this.播放OK;
    };
    this.设置播放 = function() { //
        this.播放OK = true;
    };
    this.不播放 = function() { //
        this.播放OK = false;
    };
    this.is播放 = function() { //
        return this.播放OK;
    };
    this.getUrl = function() { //
        var dat = this.getBUF();
        var i = dat.上次index++;
        var arr = this.BUF.URLs;
        if (i >= arr.length) {
            i = 0;
            dat.上次index = 0;
        }
        var url = arr[i];
        this.save();
        if (_SYS.测试) {
            return this.名称() + '_' + url;
        }
        return url;
    };
    this.停止exec = function() { //
        this.继续exec = false;
    };
    this.save = function() { //
        DAT.set_声音(this.名称(), this.BUF);
    };
}
// 
// 
const SOUND = {
    getByNa: function(Na) {
        return new CLA( //
            DAT.get_声音(Na) //
        );
    },
    //
    // na : 声音名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        // 
        init();
        // 
        var d = DAT.get_声音(na);
        if (d) {
            // 
            if (d.版本 == o.版本) {
                return;
            }
            // 
            o.DAT = d.DAT
        } else {
            o.DAT = {
                // 通过调用,判断次数 , 调整<播放概率>
                几率_判断次数: 0, // 记录 判断次数
                几率_调用次数_播放概率: 0,
                // 
                // 例如 : 调用,判断10次 , 最多播放3次 
                次数控制_判断次数: 0, //
                次数控制_播放次数: 0,
                // 
                // 每句话都有多个版本
                // 每次按顺序播放一个
                上次index: 0,
                版本个数: o.URLs.length,
            }
        }
        // 
        o.Na = na; // 记录 声音的名称
        DAT.set_声音(na, o);
    },

    
};
module.exports = SOUND;