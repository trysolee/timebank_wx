var DAT;
var MY;
var PRO_USER;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        DAT = require('./dat');
        MY = require('./user_my');
        PRO_USER = require('./pro_user');
        // 
        atFirst = false;
    }
}
// 
// 根据 tableList 
// 把数据按<主键名>归整在一起
const tableList = { //
    // pic : table名
    // PID : 主键名
    pic: 'PID',
    projoct: 'JID',
    work: 'WID',
    user: 'UID',
    pro_user: null,
    // 
    // 记录 <项目.分组>的全部user
    // 用于 <user>权限调整
    pro_all_user: 'UID',
    user_my: null,
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
const JSON串toJSON = function(D) {
    //
    // 调试时,发现系统已经自动转好了
    //
    // if (D.JSON) {
    //     D.JSON = JSON.parse(D.JSON);
    // }
}
// 
const inBUF = {
    // 返回 true , 保存
    // 返回 false , 不保存
    pic: function(dat, box) {
        时间串toDate(dat);
    },
    work: function(dat, box) {
        时间串toDate(dat);
        JSON串toJSON(dat);
    },
    pro_user: function(dat, box) {
        时间串toDate(dat);
        JSON串toJSON(dat);
        // 
        for (var x in box) {
            var y = box[x];
            if (y.JID == dat.JID && y.GRO == dat.GRO) {
                box[x] = dat;
                return false;
            }
        }
        box.push(dat);
        return false; // 缓存
    },
    // 
    // user_my 是最后一个解析 , 
    // 可以用前面的数据
    user_my: function(dat) {
        时间串toDate(dat);
        JSON串toJSON(dat);
        //
        MY.当前JID = dat.JSON.JID;
        MY.当前分组 = dat.JSON.分组;
        MY.UID = dat.UID;
        MY.用户名 = dat.name;
        // 
        var o = PRO_USER.findByID(MY.当前JID, MY.当前分组);
        if (!o) {
            // 管理员不一定 有对应的 PRO_USER
            MY.is分组管理员 = false;
        } else {
            MY.is分组管理员 = o.is管理员();
        }
        return false; // 不缓存
    },
}
// 发生变化 , 重新归纳统计
const changeBUF = {
    // 按每一天 , 归纳到 DAT.dateList 里面
    pro_work: function(box, arr) {
        // 归纳统计 
        var a = {};
        for (var x in arr) {
            var d = arr[x].FT.dayFormat();
            if (a[d]) a[d] = [arr[x]];
            else a[d].push(arr[x]);
        }
        var b = [];
        for (var x in a) b.push({
            date: x,
            list: a[x],
        });
        // 排序
        b.sort(function(a, b) {
            if (a.date < b.date) return -1;
            else return 1;
        });
        DAT.dateList = b;
    },
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