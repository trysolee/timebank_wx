// 
const A = getApp();
// 
const S_FUN = {
    //
    不重复占用时刻: function(执行包_dat, 元素, //
        声音, dat) {
        var s = 声音.get时刻();
        // 
        if (元素.时间轴_被占(s)) {
            声音.不播放();
            声音.停止exec();
        }
    },
    //
    元素时长大于: function(执行包_dat, 元素, //
        声音, dat) {
        if (元素.时长() <= dat.时长) {
            声音.不播放();
            声音.停止exec();
        }
    },
    //
    // 载入一个元素 , 首先判断剩下的时间够不够
    // 如果不够 , 调整元素开始的时间
    // 
    倒设_时刻: function(执行包_dat, 元素, //
        声音, dat) {
        声音.set时刻(元素.时间轴_倒设_时刻(dat.时刻));
        声音.设置播放();
    },
    // 
    设置_时刻_一半: function(执行包_dat, 元素, //
        声音, dat) {
        var l = 元素.剩下时间(执行包_dat);
        var s = 元素.时间轴_倒设_时刻(l / 2);
        声音.set时刻(s);
        声音.设置播放();
    },
    // 
    时刻循环: function(执行包_dat, 元素, //
        声音, dat) {
        // 
        var s = dat.间距;
        var e = dat.结尾留空;
        var l = 元素.时长();
        // 
        for (var i = 执行包_dat.元素_开始偏移 + s; //
            i < l - e; i += s) {
            if (元素.时间轴_被占(i)) continue;
            元素.时间轴_设置_播放(声音.getUrl(), i);
        }
        // 
    },
    // 
    后续声音: function(执行包_dat, 元素, //
        声音, dat) {
        var t = 声音.get时刻();
        var y = dat.间隔;
        // 
        var a = [];
        a.push(dat.声音);
        // 
        元素.创建_时刻轴1(执行包_dat //
            , Number(t) + Number(y) //
            , a);
        // 
    },
    // 
    几率_一定播放: function(执行包_dat, 元素, //
        声音, dat) {
        声音.设置播放();
        // 元素.时间轴_设置_播放();
    },
    // 
    几率_播放次数控制: function(执行包_dat, 元素, //
        声音, dat) {
        // 
        var D = 声音.getDAT();
        var 次数 = ++D.次数控制_判断次数;
        if (次数 >= dat.每) {
            D.次数控制_播放次数 = 0;
            D.次数控制_判断次数 = 0;
        }
        // 
        if (声音.is播放()) {
            var i = ++D.次数控制_播放次数;
            if (i >= dat.播) {
                声音.不播放();
            }
        }
    },
    // 
    几率_调用次数: function(执行包_dat, 元素, //
        声音, dat) {
        // 
        var D = 声音.getDAT();
        // 
        D.几率_判断次数++;
        var j = D.几率_判断次数;
        var 播放概率 = D.几率_调用次数_播放概率;
        if (dat[j]) {
            播放概率 = //
                D.几率_调用次数_播放概率 = dat[j];
        }
        // 
        if (A.SYS.随机数(0, 100) <= 播放概率) {
            声音.设置播放();
        } else {
            声音.不播放();
        }
    },
};
module.exports = S_FUN;