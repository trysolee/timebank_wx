
// 
var CS = require('./cs');
const A = getApp();
// 
const FIRST = {
    // 校验
    校验_byCS: function() {
        A.ST.reSet();
        var arr = FIRST.校验项目;
        for (var i in arr) {
            arr[i]();
        }
    },
    // 
    校验项目: [
        function() { // 检查 元素<声音>
            // 
            A.ST.show('检查 元素<声音>引用 -----');
            A.SYS.superEach(null, CS.元素 // 
                , ['_each_', '声音', '_each_', 'arr', '_each_'] // 
                ,
                function(na, str, fly) {
                    if (!CS.声音[str]) {
                        A.ST.show('没找到声音 : ' + str);
                    }
                } //
                , 0 //
                , {});
            // 
            // 检查 fly 应用
            A.SYS.superEach(null, CS.元素 // 
                , ['_each_', '声音', '_each_', 'fly'] // 
                ,
                function(na, str, fly) {
                    if (!FLY[str]) {
                        A.ST.show('没找到 [ fly ] : ' + str);
                    }
                } //
                , 0 //
                , {});
        },
        function() { // 检查 任务<元素>合法性
            // 
            A.ST.show('检查 任务<元素>引用 -----');
            A.SYS.superEach(null, CS.任务 // 
                , ['_each_', '元素', '_each_'] // 
                ,
                function(na, str, fly) {
                    if (!CS.元素[str]) {
                        A.ST.show('没找到元素 : ' + str);
                    }
                } //
                , 0 //
                , {});
        },
        function() { // 检查 元素<参数>名称
            // 
            A.ST.show('检查 元素<参数>名称 -----');
            A.SYS.superEach(null, CS.元素 // 
                , ['_each_', '_each_'] // 
                ,
                function(na, str, fly) {
                    if (fly.arr.indexOf(na) < 0) {
                        A.ST.show('元素<参数> 非法 : ' + str);
                    }
                } //
                , 0 //
                , {
                    arr: ['nextKey' //
                        , '时长' //
                        , '声音' //
                        , '中断权' //
                        , '提前' //
                        , '延迟' //
                    ]
                });
        },
        function() { // 检查 元素<参数>名称
            // 
            A.ST.show('检查 任务<参数>名称 -----');
            A.SYS.superEach(null, CS.任务 // 
                , ['_each_', '_each_'] // 
                ,
                function(na, str, fly) {
                    if (fly.arr.indexOf(na) < 0) {
                        A.ST.show('任务<参数> 非法 : ' + str);
                    }
                } //
                , 0 //
                , {
                    arr: ['name' //
                        , '元素' //
                        , '启动时间段' //
                        , '条件' //
                        , '提前' //
                        , '延迟' //
                    ]
                });
        },
    ],
    // 
    // 
    // 初始化_数据byCS: function() {
    //     FIRST.Each(CS.声音, FIRST.初始化_声音);
    //     FIRST.Each(CS.元素, FIRST.初始化_元素);
    //     FIRST.Each(CS.元素插入, FIRST.初始化_元素插入);
    //     FIRST.Each(CS.任务, FIRST.初始化_任务);
    //     FIRST.Each(CS.提款, FIRST.初始化_提款);
    //     // 
    // },
    Each: function(arr, fun) {
        for (var i in arr) {
            fun(i, arr[i]);
        }
    },
    // 
    测试1: function() {
        FIRST.Each(CS.声音, A.SOUND.初始化);
        FIRST.Each(CS.元素, A.ELEMENT.初始化);
        FIRST.Each(CS.任务, A.MISSION.初始化);
        // FIRST.Each(CS.元素, A.ELEMENT.初始化);
        FIRST.Each(CS.提款, A.TAKEBACK.初始化);
        // 
        A.MISSION.保存列表();
        A.TAKEBACK.保存列表();
        // 
        // var w = A.MISSION.getByNa('起床');
        var dat = w.创建_执行包();
        // 
        return dat;
    },
    //
    // 
    测试2: function(执行包) {
        var m = A.MISSION.getBy执行包(执行包);
        m.循环执行(执行包);
    },
    //
    // 
    测试3: function() {
        var j;
        for (var i = 0; i < 10000; i++) {
            j = A.SYS.随机数(1, 999);
            if (j <= 0) {
                A.ST.show('0 --xxx -');
            }
            if (j == 1) {
                A.ST.show('1 ---');
            }
            if (j == 999) {
                A.ST.show('999 ---');
            }
            if (j >= 1000) {
                A.ST.show('1000 --xxx -');
            }
        }
    },
    //
};
module.exports = FIRST;