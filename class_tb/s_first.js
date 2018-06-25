// 
var FLY = require('./s_fly');
var DAT = require('./s_dat');
var CS = require('./cs');
var _SYS = require('../class/sys');
var _ST = require('../class/showtxt');
// var CS = require('./s_test');
// var CS = require('./s_cs');
// var CS = {
//     提款: null,
//     任务:  null,
//     元素:  null,
//     元素插入: null,
//     声音组: null,
//     声音: null,
// };
// 
// 
const FIRST = {
    // 校验
    校验_byCS: function() {
        _ST.reSet();
        var arr = FIRST.校验项目;
        for (var i in arr) {
            arr[i]();
        }
    },
    校验项目: [
        function() { // 检查 元素<声音>
            // 
            _ST.show('检查 元素<声音>引用 -----');
            _SYS.superEach(null , CS.元素 // 
                , ['_each_', '声音', '_each_', 'arr', '_each_'] // 
                ,
                function(na , str, fly) {
                    if (!CS.声音[str]) {
                        _ST.show('没找到声音 : ' + str);
                    }
                } //
                , 0 //
                , {});
            // 
            // 检查 fly 应用
            _SYS.superEach(null , CS.元素 // 
                , ['_each_', '声音', '_each_', 'fly'] // 
                ,
                function(na , str, fly) {
                    if (!FLY[str]) {
                        _ST.show('没找到 [ fly ] : ' + str);
                    }
                } //
                , 0 //
                , {});
        },
        function() { // 检查 任务<元素>合法性
            // 
            _ST.show('检查 任务<元素>引用 -----');
            _SYS.superEach(null , CS.任务 // 
                , ['_each_', '元素', '_each_'] // 
                ,
                function(na , str, fly) {
                    if (!CS.元素[str]) {
                        _ST.show('没找到元素 : ' + str);
                    }
                } //
                , 0 //
                , {});
        },
        function() { // 检查 元素<参数>名称
            // 
            _ST.show('检查 元素<参数>名称 -----');
            _SYS.superEach(null , CS.元素 // 
                , ['_each_', '_each_'] // 
                ,
                function(na , str, fly) {
                    if (fly.arr.indexOf(na) < 0) {
                        _ST.show('元素<参数> 非法 : ' + str);
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
            _ST.show('检查 任务<参数>名称 -----');
            _SYS.superEach(null , CS.任务 // 
                , ['_each_', '_each_'] // 
                ,
                function(na , str, fly) {
                    if (fly.arr.indexOf(na) < 0) {
                        _ST.show('任务<参数> 非法 : ' + str);
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
    初始化_数据byCS: function() {
        FIRST.Each(CS.声音, FIRST.初始化_声音);
        FIRST.Each(CS.元素, FIRST.初始化_元素);
        FIRST.Each(CS.元素插入, FIRST.初始化_元素插入);
        FIRST.Each(CS.任务, FIRST.初始化_任务);
        FIRST.Each(CS.提款, FIRST.初始化_提款);
        // 
    },
    Each: function(arr, fun) {
        for (var i in arr) {
            fun(i, arr[i]);
        }
    },
    //

    //
    初始化_提款: function(na, o) {
        DAT.set_提款(na, o);
    },
    //
    初始化_元素插入: function(na, o) {
        DAT.set_元素插入(na, o);
    },
    // 
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
module.exports = FIRST;