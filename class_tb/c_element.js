// 
const A = getApp();
// 
const KEY = {
    禁止提前: function() {
        this.判断记录 = function(声音Na) {
            // 
        };
        this.播放记录 = function(声音Na, Url) {
            // 
        };
        this.继续判断 = function() {
            return true;
        };
        this.end = function(elem) {
            // 
        };
    },
    不限句数: function() {
        this.判断记录 = function(声音Na) {
            // 
        };
        this.播放记录 = function(声音Na, Url) {
            // 
        };
        this.继续判断 = function() {
            return true;
        };
        this.end = function(elem) {
            // 
        };
    },
    最少一句: function() {
        this.播放了 = false;
        this.arr = [];
        // 
        this.判断记录 = function(声音Na) {
            this.arr.push(声音Na);
            // 
        };
        this.播放记录 = function(声音Na, Url) {
            this.播放了 = true;
        };
        this.继续判断 = function() {
            return true;
        };
        this.end = function(elem) {
            if (!this.播放了) {
                var l = this.arr.length;
                var i = A.SYS.随机数(0, l - 1);
                // 
                var s = A.SOUND.getByNa(this.arr[i]);
                elem.时间轴_设置_播放(s.getUrl());
            }
        };
    },
    最多一句: function() {
        this.播放了 = false;
        this.判断记录 = function(声音Na) {
            // 
        };
        this.播放记录 = function(声音Na, Url) {
            this.播放了 = true;
        };
        this.继续判断 = function() {
            return !this.播放了;
        };
        this.end = function(elem) {
            // 
        };
    },
};
// 
// 元素
const FUN = function(B) {
    // 
    this.BUF = B;
    // 
    this.名称 = function() { // 名称
        return this.BUF.Na;
    };
    // 
    // 
    // this.重置偏移量 = function(执行包_dat) {
    //     执行包_dat.元素_开始偏移 = //
    //         Math.round((new Date().getTime() - 执行包_dat.元素_开始时刻) / 1000);
    // }
    // 
    this.取消漏播声音 = function(执行包_dat) {
        var e, a, b;
        e = A.ELEMENT.getBy执行包(执行包_dat);
        b = e.当前时刻(执行包_dat) - 10; // 10秒前
        // 
        var arr = 执行包_dat.时间轴;
        for (var i in arr) {
            var o = arr[i];
            // 
            if (o.时差 <= b) {
                o.已播放 = true;
            }
        }
    }
    // 注意 : 不一定在 0 开始 // 单位 : 秒
    this.开始时刻 = function(执行包_dat) {
        return 执行包_dat.元素_开始偏移;
    };
    // 
    this.当前时刻 = function(执行包_dat) {
        var d = new Date();
        // 
        var a = this.开始时刻(执行包_dat); // 
        var b = Math.round((d - 执行包_dat.元素_开始时刻) / 1000);
        // 
        return a + b;
    };
    // 
    this.剩下时间 = function(执行包_dat) {
        return this.时长() - this.当前时刻(执行包_dat);
    };
    this.时长 = function() { //
        return this.BUF.时长;
    };
    this.声音s = function() { //
        return this.BUF.声音;
    };
    this.创建_时刻轴 = function(执行包_dat) { // 元素名称
        var arr = this.声音s();
        for (var i in arr) {
            // 
            this.KEY = new KEY[arr[i].key]();
            // 
            this.创建_时刻轴1(执行包_dat //
                , i, arr[i].arr);
        }
        执行包_dat.时间轴 = this.时间轴;
    };
    this.KEY = null;
    this.创建_时刻轴1 = function(执行包_dat //
        , T, arr) { // 
        // 
        var key = this.KEY;
        // 
        for (var i in arr) {
            // 
            var n = arr[i]; // n : 声音Na
            var s = A.SOUND.getByNa(n);
            s.set时刻(T);
            // 
            key.判断记录(n);
            if (s.exec(执行包_dat, this)) {
                var u = s.getUrl();
                key.播放记录(n, u);
                // 
                this.时间轴_设置_播放(u, s.get时刻());
            }
            if (!key.继续判断()) {
                return;
            }
        }
    };
    // 
    // 
    this.时间轴 = [];
    // 
    //   
    this.时间轴_被占 = function(s) {
        var l = 5; // +- 时间差
        var a = s - l;
        var b = s + l;
        var arr = this.时间轴;
        // 
        for (var i in arr) {
            if (a <= arr[i].时差 && arr[i].时差 <= b) return true;
        }
        return false;
    };
    //   
    this.时间轴_倒设_时刻 = function(s) {
        return this.时长() - s;
    };
    this.时间轴_设置_播放 = function(url, T) {
        // 
        this.时间轴.push({
            时差: T, // 单位 : 秒 
            声音URL: url,
            已播放: false,
        });
    };
    this.save = function() { //
        A.DAT.set_元素(this.名称(), this.BUF);
    };
}
// 
// 
const ELEMENT = {
    //
    getByNa: function(Na) {
        //
        // 
        return new FUN( //
            A.DAT.get_元素(Na) //
        );
    },
    //
    getBy执行包: function(dat) {
        // 
        var o = ELEMENT.getByNa(dat.元素);
        o.时间轴 = dat.时间轴;
        return o;
    },
    // na : 元素名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        // 
        var d = A.DAT.get_元素(na);
        if (d) {
            // 
            // 
            o.DAT = d.DAT
        } else {
            o.DAT = {
                最近5次完成时间: [],
            }
        }
        o.Na = na; // 记录 名称
        // 
        A.DAT.set_元素(na, o);
    },
};
module.exports = ELEMENT;