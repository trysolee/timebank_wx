// 
var DAT = require('./s_dat');
var FUN = require('./s_fun');
// 
const FLY = {
    任务: null,
    元素: null,
    // 
    自定义元素: {
       // 
    },
    // 
    禁止提前: {
       // 
    },
    不限句数: {
        声音na: null,
        当前时刻: 0,
        // 
        //  3 : 未设置
        //  5 : 播放
        //  7 : 不播放
        播放opt: 3,
        时间轴: [],
        exec: function(声音) {
            var exe = 声音.exec;
            for (var i = 0; i < exe.length; i++) {
                var e = exe[i];
                FUN[e.fun](FLY.任务 //
                    , FLY.元素 // 
                    , this //
                    , 声音dat //
                    , e.dat);
                // 
            }
            if (this.播放) {
                this.播放声音();
            }
        },
        返回时间轴: function() {
            // 
        },
        播放声音: function() {
            // 把 声音 添加到 <时间轴>
        },
        不播放: function() {
            this.播放 = 7;
        },
        设置播放: function() {
            this.播放 = 5;
        },
        设置_时刻: function(s) {
            this.当前时刻 = s;
        },
        倒设_时刻: function() {
            // body...
        },
        is播放: function() {
            // body...
        },
    },
    最多一句: {
        任务: null,
        元素: null,
        声音na: null,
        当前时刻: 0,
        播放: false,
        时间轴: [],
        exec: function() {
            var 声音dat = DAT.声音(this.声音na);
            var 声音cla = DAT.声音cla(this.声音na);
            var exe = 声音cla.exec;
            for (var i = 0; i < exe.length; i++) {
                var e = exe[i];
                FUN[e.fun](this.任务 //
                    , this.元素 // 
                    , this //
                    , 声音dat //
                    , e.dat);
                // 
                if (this.播放) {
                    this.播放声音();
                }
            }
        },
        返回时间轴: function() {
            // 
        },
    },
    最少一句: {
        add声音: function(s) {
            // body...
        }
    },
};
module.exports = FLY;