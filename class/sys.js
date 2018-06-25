// 不能调用其他 exports
const SYS = {
    //
    //   
    // ===== 常量 =====
    // 
    非正式测试: true,
    // 
    测试: true,
    测试用户: 'admin',
    // 测试用户: 'user',
    //
    项目名_长度: 35,
    分组名_长度: 35,
    // 
    // 
    // 包括 m1 和 m2
    随机数: function(m1, m2) {
        // body...
    },
    //
    //
    //
    // 例子 :
    // 
    // _SYS.superEach(null, CS.元素 // 
    //     , ['_each_', '_each_'] // 
    //     ,
    //     function(na, str, fly) {
    //         if (fly.arr.indexOf(na) < 0) {
    //             _ST.show('元素<参数> 非法 : ' + str);
    //         }
    //     } //
    //     , 0 //
    //     , {
    //         arr: ['nextKey' //
    //             , '时长' //
    //             , '声音' //
    //             , '中断权' //
    //             , '提前' //
    //             , '延迟' //
    //         ]
    //     });
    superEach: function(na, obj, arr, fun, index, fly) {
        if (index == arr.length) {
            fun(na, obj, fly);
            return;
        }
        var k = arr[index];
        if (k == '_each_') {
            for (var i in obj) {
                SYS.superEach(i, obj[i], arr, fun, index + 1, fly);
            }
        } else {
            if (obj[k]) //
                SYS.superEach(k, obj[k], arr, fun, index + 1, fly);
        }
    },
    // 
};
module.exports = SYS;