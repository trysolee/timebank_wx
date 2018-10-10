// 
// 提款
// 
// 
const A = getApp();
// 
// 提款
const FUN = function(B) {
    // 
    this.BUF = B;
    // 
    this.ID = function() { 
        return this.BUF.ID;
    };
    this.名称 = function() { // 名称
        return this.BUF.Na;
    };
    this.列表名称 = function() { //
        return this.名称();
    };
    // 
    this.预留存款 = function() { // 
        return this.BUF.预留存款;
    };
    // 
    this.时长 = function() { // 
        return this.BUF.时长;
    };
    // 单位 : 秒
    this.用掉的时间 = function(执行包_dat) { // 
        return Math.round((new Date() - 执行包_dat.提款_开始时刻) / 1000);
    };
    this.创建_执行包 = function() {
        var 元素na = this.BUF.元素[0];
        var e = A.ELEMENT.getByNa(元素na);
        // var t = new Date().getTime();
        var s = e.时长();
        var dat = {
            类型: '提款',
            提款: this.名称(),
            // 
            元素: {
                开始时刻 : new Date().getTime(),
                时长: s, // 
                原剩下时间: s,
                剩下时间: s,
                时间轴: e.get_时间轴(),
            },
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
                A.PLAY.play(o.声音URL);
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
            A.DAT.get_提款(Na) //
        );
    },
    //
    getBy执行包: function(dat) {
        var o = TAKEBACK.getByNa(dat.提款);
        return o;
    },
    //
    元素_数据: function(执行包) {
        return 执行包.元素;
    },
    //
    用掉的时间: function(执行包) {
        var e = TAKEBACK.元素_数据(执行包);
        return e.时长 - e.剩下时间; //
    },
    //
    // na : 声音名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        // 
        var d = A.DAT.get_提款(na);
        if (d) {
            // 
            // if (d.版本 == o.版本) {
            //     TAKEBACK.保存列表1(na, o);
            //     return;
            // }
            // 
            o.DAT = d.DAT
        } else {
            o.DAT = {};
            var y = o.元素;
            var i = 0;
            for (var x in y) {
                var o1 = A.ELEMENT.getByNa(y[x]);
                i += Number(o1.时长());
            }
            o.DAT.时长 = i;
        }
         o.ID = na; // 记录 名称
        // 
        A.DAT.set_提款(na, o);
        TAKEBACK.保存列表1(na, o);
    },
    // 
    // 记录<任务>列表数据 , 
    // 为 <任务列表> 做准备
    初始化记录: {},
    //
    // 保存<任务>列表数据
    保存列表: function() {
        A.DAT.set_SYS('提款列表', TAKEBACK.初始化记录);
    },
    保存列表1: function(na, o) {
        // 为 <保存列表>做准备... 
        // var m = new FUN(o);
        TAKEBACK.初始化记录[na] = true;
    },
    // 
    任务列表: function() {
        // 
        var arr = A.DAT.get_SYS('提款列表');
        var ar = [];
        for (var i in arr) {
            ar.push(TAKEBACK.getByNa(i));
        }
        return ar;
    },
    //
    // 测试用
    // 快进 60秒 
    快进: function(执行包) {
        var i = 60 * 1000;
        执行包.提款_开始时刻 -= i;
        执行包.元素_开始时刻 -= i;
    },
};
module.exports = TAKEBACK;