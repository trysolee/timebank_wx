// // 
const A = getApp();
// 
// 
const ST = require('../class/showtxt.js');
var ELEMENT;
var DAT;
var PLAY;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        ELEMENT = require('./c_element');
        PLAY = require('./c_play');
        DAT = require('./s_dat');
    }
}
// 
// 任务
const FUN = function(B) {
    // 
    this.BUF = B;
    // 
    this.名称 = function() { // 名称
        return this.BUF.Na;
    };
    //
    // 任务列表时 , 用于判断那个需要'亮显'
    this.未到时间段 = function() { // 
        if (!this.时间段()) {
            return true;
        }
        var arr = this.时间段().split(':');
        // 
        var d = new Date();
        d.setHours(arr[0]);
        d.setMinutes(arr[1]);
        var n = new Date();
        // 
        return n < d;
    };
    this.时间段 = function() { //
        return this.BUF.启动时间段;
    };
    this.时长 = function() { //
        return this.BUF.DAT.时长;
    };
    this.元素Na_arr = function() { //
        return this.BUF.元素;
    };
    this.元素个数 = function() { //
        return this.BUF.元素.length;
    };
    this.创建_执行包 = function() { // 任务id
        // 
        var dat = {
            类型: '任务',
            任务: this.名称(),
            // 
            元素组: null, // 
            // 
            当前元素下标: 0, // 
            // 
        };
        // 
        // 计算整理 元素组
        var arr = this.元素Na_arr();
        var d = dat.元素组 = [];
        for (var i = 0; i < arr.length; i++) {
            var na = arr[i];
            var e = A.ELEMENT.getByNa(na);
            var s = e.时长();
            // 
            d.push({
                keyNa: na,
                time: A.SYS.秒ToStr(s),
                isKey: false,
                type: 'default',
                View: 'view1',
                // 
                时长: s, // 
                原剩下时间: s,
                剩下时间: s,
                时间轴: e.get_时间轴(),
            });
        }
        A.ELEMENT.设定按键(d, 1);
        A.ELEMENT.设定显示(d[0]);
        // A.ELEMENT.计算显示(d[0]);
        // 
        return dat;
    };
    this.save = function() { //
        A.DAT.set_任务(this.名称(), this.BUF);
    };
}
// 
const MISSION = {
    // 
    getByNa: function(Na) {
        // 
        return new FUN( //
            A.DAT.get_任务(Na) //
        );
    },
    //
    getBy执行包: function(dat) {
        // 
        var o = MISSION.getByNa(dat.任务);
        return o;
    },
    // 单位 : 秒
    剩下的时间: function(执行包) {
        var d = new Date().getTime();
        return Math.round((d - 执行包_dat.任务_开始时刻) / 1000);
    },
    //
    // 测试用
    // 快进 60秒 
    快进: function(执行包) {
        var i = 60 * 1000;
        执行包.任务_开始时刻 -= i;
        执行包.元素_开始时刻 -= i;
    },
    //
    // na : 声音名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        // 
        var d = A.DAT.get_任务(na);
        if (d) {
            // 
            // 
            o.DAT = d.DAT
        } else {
            o.DAT = {};
        }
        //  计算 总时间
        var y = o.元素;
        var i = 0;
        for (var x in y) {
            var o1 = A.ELEMENT.getByNa(y[x]);
            i += Number(o1.时长());
        }
        o.DAT.时长 = i;
        // 
        o.Na = na; // 记录 名称
        // 
        A.DAT.set_任务(na, o);
        MISSION.保存列表1(na, o);
        // 
    },
    // 
    // 记录<任务>列表数据 , 
    // 为 <任务列表> 做准备
    初始化记录: {},
    //
    // 保存<任务>列表数据
    保存列表: function() {
        A.DAT.set_SYS('任务列表', MISSION.初始化记录);
    },
    保存列表1: function(na, o) {
        // 为 <保存列表>做准备... 
        // var m = new FUN(o);
        MISSION.初始化记录[na] = true;
    },
    // 
    // 根据当前时间
    // 列出最可能执行的任务
    任务列表: function() {
        // 
        var arr = A.DAT.get_SYS('任务列表');
        var ar = [];
        for (var i in arr) {
            ar.push(MISSION.getByNa(i));
        }
        return ar;
    },
};
module.exports = MISSION;