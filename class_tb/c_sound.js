// 
const A = getApp();
// 
// 元素
const CLA = function(B) {
    this.BUF = B;
    this.播放OK = false;
    this.继续exec = true;
    // 
    this.getBUF = function() { // 
        return this.BUF;
    };
    this.getDAT = function() { // 
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
            A.FUN[f](执行包_dat, 元素, this, d);
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
        var buf = this.getBUF();
        var i = 0;
        var arr = buf.URLs;
        // 
        if (buf.顺序 == '循环') {
            i = buf.DAT.上次index++;
            if (i >= arr.length) {
                i = 0;
                buf.DAT.上次index = 0;
            }
            this.save();
        } else {
            i = A.SYS.随机数(0, arr.length - 1);
        }
        return A.SYS.声音URL(arr[i]);
    };
    this.停止exec = function() { //
        this.继续exec = false;
    };
    this.save = function() { //
        A.DAT.set_声音(this.名称(), this.BUF);
    };
}
// 
// 
const SOUND = {
    getByNa: function(Na) {
        // 
        // 
        return new CLA( //
            A.DAT.get_声音(Na) //
        );
    },
    //
    // na : 声音名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        // 
        // 
        var d = A.DAT.get_声音(na);
        if (d) {
            // 
            // if (d.版本 == o.版本) {
            //     return;
            // }
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
        A.DAT.set_声音(na, o);
    },
};
module.exports = SOUND;