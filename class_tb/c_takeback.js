// 
// 提款
// 
var ELEMENT;
var DAT;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        ELEMENT = require('./c_element');
        DAT = require('./s_dat');
    }
}
// 
// 提款
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
    this.预留存款 = function() { // 
        return this.BUF.预留存款;
    };
    // 
    this.时长 = function() { // 
        return this.BUF.时长;
    };
    this.创建_执行包 = function() { // 
        // 
        var dat = {
            类型: '提款',
            提款: this.名称(),
            提款_开始时刻: new Date().getTime(),
        };
        // 
        return dat;
    };
    this.循环执行 = function(执行包_dat) {
        // 
        var e, a, b;
        a = 0;
        b = Math.round((new Date() - 执行包_dat.提款_开始时刻) / 1000);
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
const TAKEBACK = {
    // 
    getByNa: function(Na) {
        return new FUN( //
            DAT.get_提款(Na) //
        );
    },
    //
    getBy执行包: function(dat) {
        var o = TAKEBACK.getByNa(dat.提款);
        return o;
    },
    //
    // na : 声音名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        // 
        init();
        // 
        var d = DAT.get_提款(na);
        if (d) {
            // 
            if (d.版本 == o.版本) {
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
        DAT.set_提款(na, o);
        TAKEBACK.保存列表1(na, o);
    },
    // 
    // 记录<任务>列表数据 , 
    // 为 <任务列表> 做准备
    初始化记录: {},
    //
    // 保存<任务>列表数据
    保存列表: function() {
        DAT.set_SYS('提款列表', TAKEBACK.初始化记录);
    },
    保存列表1: function(na, o) {
        // 为 <保存列表>做准备... 
        // var m = new FUN(o);
        TAKEBACK.初始化记录[na] = true;
    },
    // 
    任务列表: function() {
        // 
        init();
        // 
        var arr = DAT.get_SYS('提款列表');
        var ar = [];
        for (var i in arr) {
            ar.push(TAKEBACK.getByNa(i));
        }
        return ar;
    },
};
module.exports = TAKEBACK;