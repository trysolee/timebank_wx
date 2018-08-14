// 
const url1 = 'http://localhost/';
const post版本 = 'tb';
// 
const SYS = {
    //
    //   
    // ===== 常量 =====
    // 
    非正式测试: true, // 正式调试之前
    // 非正式测试: false, // 正式调试之前
    // 
    测试: true,
    不播放声音: false,
    // 测试用户: 'admin',
    测试用户: 'user2q',
    //
    项目名_长度: 35,
    分组名_长度: 35,
    // 
    LoginCode: '__LOGIN_CODE__',
    // 
    声音URL: function(url) {
        return url1 + 'sounds/' + url + '.m4a';
    },
    post_URL: function(url) {
        return url1 + post版本 + url;
    },
    // 
    // 包括 m1 和 m2
    随机数: function(m1, m2) {
        var j = m2 - m1 + 1;
        var i = Math.floor(Math.random() * j)
        return m1 + i;
    },
    // 用于<任务执行> 和 <提款>
    秒ToStr: function(s) {
        var f = '';
        if (Number(s) < 0) {
            s = s * -1;
            f = '-';
        }
        var i = s % 60;
        var m = Math.floor(s / 60);
        // 
        if (i < 10) i = '0' + i;
        return f + m + ':' + i;
    },
    //
    //
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