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
    this.计时开始 = function(执行包_dat) {
        var na = this.名称();
        执行包_dat.元素组[na].开始时刻 = //
            new Date().getTime();
    };
    this.计算剩下时间 = function(执行包_dat) {
        var na = this.名称();
        var o = 执行包_dat.元素组[na];
        return o.剩下时间 = //
            this.时长() - //
            (new Date().getTime() - o.开始时刻) / 1000;
    };
    this.剩下时间 = function(执行包_dat) {
        var na = this.名称();
        return 执行包_dat.元素组[na].剩下时间;
    };
    this.时长 = function() { //
        return this.BUF.时长;
    };
    this.声音s = function() { //
        return this.BUF.声音;
    };
    //
    // 
    this.get_时间轴 = function() { //
        var arr = this.声音s();
        for (var i in arr) {
            // 
            var key = new KEY[arr[i].key]();
            // 
            this.创建_时刻轴1(key //
                , i, arr[i].arr);
        }
        // 执行包_dat.时间轴 = this.时间轴;
        return this.时间轴;
    };
    // 
    this.创建_时刻轴1 = function(key //
        , T, arr) { // 
        // 
        // var 时间轴 = {};
        // 
        for (var i in arr) {
            // 
            var n = arr[i]; // n : 声音Na
            var s = A.SOUND.getByNa(n);
            s.set时刻(T);
            // 
            key.判断记录(n);
            if (s.exec(this)) {
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
    //
    当前元素_数据: function(执行包) {
        return 执行包.元素组[执行包.当前元素下标];
    },
    // 
    元素转换: function(执行包, 下标) {
        // 
        var list = 执行包.元素组;
        var 当前 = 执行包.当前元素下标;
        // 
        ELEMENT.取消按键(list, Number(当前) + 1);
        ELEMENT.取消按键(list, Number(当前) - 1);
        ELEMENT.计算显示(list[当前]);
        ELEMENT.取消显示(list[当前]);
        // 
        ELEMENT.设定按键(list, Number(下标) + 1);
        ELEMENT.设定按键(list, Number(下标) - 1);
        ELEMENT.设定显示(list[下标]);
        ELEMENT.计算显示(list[下标]);
        // 
        执行包.当前元素下标 = 下标;
    },
    //
    播放声音: function(e) {
        var s = e.时长 - e.剩下时间; //
        var arr = e.时间轴;
        // 
        for (var i in arr) {
            var o = arr[i];
            if (o.已播放) continue;
            // 
            if (o.时差 <= s) {
                A.PLAY.play(o.声音URL);
                o.已播放 = true;
            }
        }
    },
    //
    取消漏播声音: function(元素数据) {
        var e = 元素数据;
        var s = e.时长 - e.剩下时间 - 5; // 提前 5 秒
        var arr = e.时间轴;
        // 
        for (var i in arr) {
            var o = arr[i];
            // 
            if (o.时差 <= s) {
                o.已播放 = true;
            }
        }
    },
    //
    剩下时间: function(执行包) {
        var l = 0;
        var arr = 执行包.元素组;
        // 
        for (var i in arr) {
            l = Number(l) + Number(arr[i].剩下时间);
        }
        return l;
    },
    //
    设定按键: function(arr, 下标) {
        if (下标 < 0) return;
        if (下标 >= arr.length) return;
        // 
        var obj = arr[下标];
        obj.isKey = true;
        obj.type = 'primary';
    },
    //
    取消按键: function(arr, 下标) {
        if (下标 < 0) return;
        if (下标 >= arr.length) return;
        // 
        var obj = arr[下标];
        obj.isKey = false;
        obj.type = 'default';
    },
    //
    设定显示: function(obj) {
        obj.开始时刻 = new Date().getTime();
        obj.原剩下时间 = obj.剩下时间;
        obj.View = 'view2';
    },
    //
    计算显示: function(obj) {
        var s = new Date().getTime();
        var t = Math.round((s - obj.开始时刻) / 1000);
        obj.剩下时间 = obj.原剩下时间 - t;
        obj.time = A.SYS.秒ToStr(obj.剩下时间);
    },
    //
    取消显示: function(obj) {
        obj.开始时刻 = null;
        obj.View = 'view1';
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