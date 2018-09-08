const A = getApp();
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
        A.My.家庭id = dat.JID;
        A.My.UID = dat.UID;
        var 角色 = A.My.角色 = dat.JSON.角色;
        A.My.用户名 = dat.JSON.name;
        A.My.密码 = dat.JSON.短密;
        // 
        if (角色 == '管理员') {
            A.My.is管理员 = true;
        } else if (角色 == '系统管') {
            A.My.is管理员 = true;
            A.My.is系统管理员 = true;
        }
        return false; // 不缓存
    },
    jt: function(dat) {
        //
        A.My.家庭名称 = dat.NA;
        return false; // 不缓存
    },
    user: function(dat) {
        //
        var u = A.USER.getByBUF(dat);
        if (u.is别家家长()) {
            return false // 不缓存
        }
        return true; // 缓存
    },
}
// 发生变化 , 重新归纳统计
const changeBUF = {
    // TODO
}
// =====================================
function _SDB_(tList) {
    this.MYDAT = {};
    this.BOX = {};
    // this.INDEX = {};
    //
    this.tableList = tList;
    // n : 'pro_work'  //表名
    this.freeBUF = function(n) {
        // 
        delete this.BOX[n];
    };
    this.delOne = function(n, id) {
        // 
        var o = this.getBUF(n);
        delete o[id];
    };
    this.getOne = function(n, id) {
        // 
        var o = this.getBUF(n);
        return o[id];
    };
    this.getBUF = function(n) {
        // 
        if (!this.BOX[n]) {
            return [];
        }
        return this.BOX[n];
    };
    this.setBUF = function(n, arr) {
        // 
        this.BOX[n] = arr;
    };
    this.jsonIN = function(D) {
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