// 
var _SYS = require('../class/sys');
// 
const S_FUN = {
    //
    元素时长大于: function(执行包_dat, 元素, //
        声音, dat) {
        if (元素.时长() <= dat.时长) {
            声音.不播放();
        }
    },
    //
    // 载入一个元素 , 首先判断剩下的时间够不够
    // 如果不够 , 调整元素开始的时间
    // 
    倒设_时刻: function(执行包_dat, 元素, //
        声音, dat) {
        元素.时间轴_倒设_时刻(dat.时刻);
    },
    // 
    几率_一定播放: function(执行包_dat, 元素, //
        声音, dat) {
        元素.设置播放();
    },
    // 
    几率_播放次数控制: function(执行包_dat, 元素, //
        声音, dat) {
        // 
        var buf = 声音.getBUF();
        var 次数 = ++buf.次数控制_判断次数;
        if (次数 >= dat.每) {
            buf.次数控制_播放次数 = 0;
            buf.次数控制_判断次数 = 0;
        }
        // 
        if (声音.is播放()) {
            var i = ++buf.次数控制_播放次数;
            if (i >= dat.播) {
                声音.不播放();
            }
        }
    },
    // 
    几率_调用次数: function(执行包_dat, 元素, //
        声音, dat) {
        // 
        var buf = 声音.getBUF();
        // 
        buf.几率_判断次数++;
        var j = buf.几率_判断次数;
        var 播放概率 = buf.几率_调用次数_播放概率;
        if (dat[j]) {
            播放概率 = //
                buf.几率_调用次数_播放概率 = dat[j];
        }
        // 
        if (_SYS.随机数(0, 100) <= 播放概率) {
            声音.设置播放();
        } else {
            声音.不播放();
        }
    },
};
module.exports = S_FUN;