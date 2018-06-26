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
    // 
    this.名称 = function() { // 名称
        return this.BUF.Na;
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
        执行包_dat.时间轴 = this.时间轴;
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
    // 
    // 
    this.时刻 = 0;
    this.时间轴 = [];
    // 
    this.时间轴_当前时刻 = function() {
        return this.时刻;
    };
    this.时间轴_设置_时刻 = function(s) {
        this.时刻 = s;
        //   
    };
    this.时间轴_倒设_时刻 = function(s) {
        this.时刻 = this.时长() - s;
    };
    this.时间轴_设置_播放 = function(url) {
        // 
        this.时间轴.push({
            时差: this.时刻, // 单位 : 秒 
            声音URL: url,
            已播放: false,
        });
    };
}
// 
// 
const ELEMENT = {
    //
    getByNa: function(Na) {
        return new FUN( //
            DAT.get_元素(Na) //
        );
    },
    //
    getBy执行包: function(dat) {
        var o = ELEMENT.getByNa(dat.元素);
        o.时间轴 = dat.时间轴;
        return o;
    },
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
        o.Na = na; // 记录 名称
        // 
        DAT.set_元素(na, o);
    },
};
module.exports = ELEMENT;