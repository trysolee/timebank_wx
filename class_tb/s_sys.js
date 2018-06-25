// 
var FLY = require('./s_fly');
var DAT = require('./s_dat');
// 
const S_SYS = {
    初始化_数据: function(argument) {
        // body...
    },
    //
    初始化_声音: function(obj) {
        for (var i in obj) {
            var o = obj[i];
            //
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
                版本个数: o.URLs.lenght,
            }
        }
    },
    //
    初始化_元素: function(obj) {
        for (var i in obj) {
            var o = obj[i];
            //
            o.DAT = {
                最近5次完成时间: [],
            }
        }
    },
    //
    初始化_任务: function(obj) {
        for (var i in obj) {
            var o = obj[i];
            //
            var y = o.元素;
            var i = 0;
            for (var x in y) {
                var o1 = DAT.get_元素(y[x]);
                i += Number(o1.时长);
            }
            o.时长 = i;
        }
    },
    创建_执行包: function(任务) {
        var o = MISSION.getByNa(任务);
        var dat = {
            任务: 任务,
            元素: o.第一个元素Na();
            当前元素下标 : 0 ; // 
            任务_开始时刻 : 
        };
    },
    创建_时间轴: function(元素) {
        FLY.元素 = 元素;
        var arr = 元素.声音;
        for (var i in arr) {
            var o = arr[i];
            //
            var fly = FLY[o.fly];
            // 
            var ar1 = o.arr;
            for (var x in o.ar1) {
                var na_s = ar1[x];
                var 声音 = DAT.get_声音(na_s);
                // 
                fly.exec(声音);
                // 
                // 立即保存 声音的数据变化
                DAT.set_声音(na_s, 声音);
            }
        }
        元素.DAT.时间轴 = fly.返回时间轴();
    },
};
module.exports = S_SYS;