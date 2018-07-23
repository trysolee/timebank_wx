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
    init();
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
    this.剩下时间 = function(执行包_dat) { //
        var d = new Date();
        var s = Math.round((d - 执行包_dat.任务_开始时刻) / 1000);
        return this.时长() - s;
    };
    this.元素个数 = function() { //
        return this.BUF.元素.length;
    };
    this.第一个元素Na = function() { //
        return this.BUF.元素[0];
    };
    this.下一个元素Na = function(执行包_dat) { //
        var i = 执行包_dat.当前元素下标 + 1;
        var m = this.BUF.元素.length;
        if (i >= m) {
            return '[ 完成 ] ';
        }
        return this.BUF.元素[i];
    };
    //
    // true : 有下一个元素
    // false : 没有下一个元素
    this.下一个元素 = function(执行包_dat) { //
        var i = ++执行包_dat.当前元素下标;
        var m = this.BUF.元素.length;
        if (i >= m) {
            // ST.showtxt('- 任务结束 -');
            return false;
        }
        var na = this.BUF.元素[i];
        var e = ELEMENT.getByNa(na);
        // 
        执行包_dat.元素 = na;
        执行包_dat.元素_开始时刻 = new Date().getTime();
        // 
        // 计算 剩下的秒数
        var s1 = this.剩下时间(执行包_dat);
        var s2 = e.时长();
        if (s2 > s1) {
            执行包_dat.元素_开始偏移 = s2 - s1;
        } else {
            执行包_dat.元素_开始偏移 = 0;
        }
        // 
        e.创建_时刻轴(执行包_dat);
        return true;
    };
    this.创建_执行包 = function() { // 任务id
        var 元素na = this.第一个元素Na();
        var 元素obj = ELEMENT.getByNa(元素na);
        // 
        var 最后一个 = false;
        if (this.元素个数() <= 1) 最后一个元素 = true;
        // 
        var dat = {
            类型: '任务',
            任务: this.名称(),
            元素: 元素na,
            // 
            // 如果<任务>剩下时间不够执行<元素>
            // <元素> 就不是从0 开始播放
            元素_开始偏移: 0,
            // 
            当前元素下标: 0, // 
            任务_开始时刻: new Date().getTime(),
            元素_开始时刻: new Date().getTime(),
            时间轴: null,
            最后一个元素: 最后一个,
        };
        元素obj.创建_时刻轴(dat);
        // 
        return dat;
    };
    this.循环执行 = function(执行包_dat) {
        // 
        var e, a, b;
        e = ELEMENT.getBy执行包(执行包_dat);
        a = e.开始时刻(执行包_dat);
        b = e.当前时刻(执行包_dat);
        // 
        var arr = 执行包_dat.时间轴;
        for (var i in arr) {
            var o = arr[i];
            if (o.已播放) continue;
            // 
            if (a <= o.时差 && o.时差 <= b) {
                PLAY.play(o.声音URL);
                o.已播放 = true;
            }
        }
    };
}
// 
const MISSION = {
    // 
    getByNa: function(Na) {
        // 
        init();
        // 
        return new FUN( //
            DAT.get_任务(Na) //
        );
    },
    //
    getBy执行包: function(dat) {
        // 
        init();
        // 
        var o = MISSION.getByNa(dat.任务);
        return o;
    },
    //
    // 单位 : 秒
    剩下的时间: function(执行包) {
        var d = new Date().getTime();
        return Math.round((d - 执行包_dat.任务_开始时刻) / 1000);
    },
    //
    // na : 声音名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        // 
        init();
        // 
        var d = DAT.get_任务(na);
        if (d) {
            // 
            if (d.版本 == o.版本) {
                MISSION.保存列表1(na, o);
                return;
            }
            // 
            o.DAT = d.DAT
        } else {
            o.DAT = {};
            var y = o.元素;
            var i = 0;
            for (var x in y) {
                var o1 = ELEMENT.getByNa(y[x]);
                i += Number(o1.时长());
            }
            o.DAT.时长 = i;
        }
        o.Na = na; // 记录 名称
        // 
        DAT.set_任务(na, o);
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
        DAT.set_SYS('任务列表', MISSION.初始化记录);
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
        init();
        // 
        var arr = DAT.get_SYS('任务列表');
        var ar = [];
        for (var i in arr) {
            ar.push(MISSION.getByNa(i));
        }
        return ar;
    },
};
module.exports = MISSION;