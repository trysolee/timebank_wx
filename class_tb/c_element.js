// 
// 
const MISSION = require('./c_mission');
const SOUND = require('./c_sound');
// 
const KEY = {
    不限句数: function() {
        this.判断记录 = function(声音Na) {
            // 
        };
        this.播放记录 = function(声音Na, Url) {
            // 
        };
        this.继续判断 = function() {
            // 
        };
        this.end = function() {
            // 
        };
    },
    最少一句: function() {
        this.判断记录 = function(声音Na) {
            // 
        };
        this.播放记录 = function(声音Na, Url) {
            // 
        };
        this.继续判断 = function() {
            // 
        };
        this.end = function() {
            // 
        };
    },
    最多一句: function() {
        this.判断记录 = function(声音Na) {
            // 
        };
        this.播放记录 = function(声音Na, Url) {
            // 
        };
        this.继续判断 = function() {
            // 
        };
        this.end = function() {
            // 
        };
    },
};
// 
// 元素
const FUN = function(B) {
    this.BUF = B;
    this.名称 = function() { // 元素名称
        // return this.BUF.JID;
    };
    this.时长 = function() { //
        // return this.BUF.JID;
    };
    this.声音s = function() { //
        // 返回 声音剧本
    };
    this.创建_时刻轴 = function(执行包_dat) { // 元素名称
        var arr = this.声音s();
        for (var i in arr) {
            this.创建_时刻轴1(执行包_dat //
                , i, arr[i].key, arr[i].arr);
        }
    };
    this.创建_时刻轴1 = function(执行包_dat //
        , T, keyNa, arr) { // 
        // 
        this.时间轴_设置_时刻(T);
        // 
        var key = new KEY[keyNa]();
        // 
        for (var i in arr) {
            // 
            var n = arr[i]; // n : 声音Na
            var s = SOUND.getByNa(n);
            // 
            key.判断记录(n);
            if (s.exec(执行包_dat, this)) {
                var u = s.getUrl();
                key.播放记录(n, u);
                this.时间轴_设置_播放(u);
            }
            if (!key.继续判断()) {
                return;
            }
        }
    };
    this.时间轴_设置_时刻 = function(s) {
        // 
        //   
        // 时间轴_例子
        var arr = [{
            时差: 10, // 单位 : 秒 
            声音URL: 'xxx',
            已播放: false,
        }, {
            时差: 15, // 单位 : 秒 
            声音URL: 'xxx',
            已播放: false,
        }, ];
        return arr;
    };
    this.时间轴_倒设_时刻 = function(s) {
        // 
    };
    this.时间轴_设置_播放 = function(url) {
        // 
    };
    this.时间轴_当前时刻 = function() {
        // 
    };
}
// 
// 
const ELEMENT = {
    getByNa: function(Na) {},
    //
    // na : 元素名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        //
        // 
        var d = DAT.get_元素(na);
        if (d) {
            // 
            if (d.版本 == o.版本) {
                return;
            }
            // 
            o.DAT = d.DAT
        } else {
            o.DAT = {
                最近5次完成时间: [],
            }
        }
        // 
        DAT.set_元素(na, o);
    },
    //
    getBy执行包: function(dat) {},
    //
    倒设_时刻: function(fly, //
        声音, dat) {
        if (元素.时长 <= dat.时长) {
            fly.声音_条件不符合();
        }
    },
    元素时长大于: function(任务, 元素, fly, //
        声音, dat) {
        if (元素.时长 <= dat.时长) {
            fly.声音_条件不符合();
        }
    },
    元素时长大于: function(任务, 元素, fly, //
        声音, dat) {
        if (元素.时长 <= dat.时长) {
            fly.声音_条件不符合();
        }
    },
    //
    // 载入一个元素 , 首先判断剩下的时间够不够
    // 如果不够 , 调整元素开始的时间
    // 
    倒设_时刻: function(任务, 元素, fly, //
        声音, dat) {
        元素.倒设_时刻(dat.时刻);
    },
    // 
    几率_一定播放: function(任务, 元素, fly, //
        声音, dat) {
        元素.倒设_时刻(dat.时刻);
    },
};
module.exports = ELEMENT;