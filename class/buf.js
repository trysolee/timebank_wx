var DAT;
var MY;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        DAT = require('./dat');
        MY = require('./user_my');
    }
}
// 
// 根据 tableList 
// 把数据按<主键名>归整在一起
const tableList = { //
    // pic : table名
    // PID : 主键名
    user: 'UID',
    // 
    user_my: null,
    // 
    jt: null, // 家庭
};
/*
数据导入时 , 进行处理
*/
const 时间变量名组 = ['FT', 'LT', 'CT'];
const 时间串toDate = function(D) {
    var T = 时间变量名组;
    for (var i in T) {
        var x = T[i];
        if (D[x]) //
            D[x] = new Date(Date.parse(D[x]));
    }
};
// 
const inBUF = {
    // 返回 true , 保存
    // 返回 false , 不保存
    // 
    // user_my 是最后一个解析 , 
    // 可以用前面的数据
    user_my: function(dat) {
        时间串toDate(dat);
        //
        MY.家庭id = dat.JID;
        MY.UID = dat.UID;
        var 角色 = MY.角色 = dat.JSON.角色;
        MY.用户名 = dat.JSON.name;
        // 
        if (角色 == '管理员') {
            MY.is管理员 = true;
        } else if (角色 == '系统管') {
            MY.is管理员 = true;
            MY.is系统管理员 = true;
        }
        return false; // 不缓存
    },
    jt: function(dat) {
        //
        MY.家庭名称 = dat.NA;
        return false; // 不缓存
    },
}
// 发生变化 , 重新归纳统计
const changeBUF = {}
// =====================================
function _SDB_(tList) {
    this.MYDAT = {};
    this.BOX = {};
    // this.INDEX = {};
    //
    this.tableList = tList;
    // n : 'pro_work'  //表名
    this.freeBUF = function(n) {
        init();
        // 
        delete this.BOX[n];
    };
    this.getOne = function(n, id) {
        init();
        // 
        var o = this.getBUF(n);
        return o[id];
    };
    this.getBUF = function(n) {
        init();
        // 
        if (!this.BOX[n]) {
            return [];
        }
        return this.BOX[n];
    };
    this.setBUF = function(n, arr) {
        init();
        // 
        this.BOX[n] = arr;
    };
    this.jsonIN = function(D) {
        init();
        // 
        var o = this.tableList;
        for (var x in o) {
            if (o[x]) {
                this.jsonIN_1(x, o[x], D);
            } else {
                this.jsonIN_null(x, D);
            }
        }
    };
    // 有关键字的处理方法
    // 
    // T : table名
    // I : 主键名
    // A : 数据数组
    this.jsonIN_1 = function(T, I, A) {
        var o = this.BOX[T];
        if (!o) o = this.BOX[T] = {};
        // 导入处理函数
        var f = inBUF[T];
        var v;
        for (var i in A) {
            if (A[i].name == T) {
                var B = A[i].arr;
                if (!B) continue;
                if (!B.length) continue;
                // 
                for (var x in B) {
                    v = B[x];
                    // v = o[B[x][I]] = B[x];
                    //
                    if (f) {
                        // 有导入函数
                        if (f(v, o)) {
                            //  导入 返回true 就缓存他
                            o[B[x][I]] = B[x];
                        }
                    } else {
                        //  没有 导入函数
                        //  
                        //  直接 缓存他
                        o[B[x][I]] = B[x];
                    }
                }
            }
        }
    };
    // 没有关键字的处理方法
    // 
    // T : table名
    // I : 主键名 ( 这里没有 )
    // A : 数据数组
    this.jsonIN_null = function(T, A) {
        var o = this.BOX[T];
        if (!o) o = this.BOX[T] = [];
        // 导入处理函数
        var f = inBUF[T];
        var v;
        // 
        if (!this.BOX[T]) this.BOX[T] = [];
        // 
        for (var i in A) {
            if (A[i].name == T) {
                var B = A[i].arr;
                if (!B) continue;
                if (!B.length) continue;
                // 
                for (var x in B) {
                    v = B[x];
                    //
                    if (f) {
                        // 有导入函数
                        if (f(v, o)) {
                            //  导入 返回true 就缓存他
                            o.push(v);
                        }
                    } else {
                        //  没有 导入函数
                        //  
                        //  直接 缓存他
                        o.push(v);
                    }
                }
            }
        }
    };
}
const buf = new _SDB_(tableList);
module.exports = buf;
// 测试用 --- 
// module.exports = {
//   jsonIN: function (D) {
//   }
// }