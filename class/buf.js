const DAT = require('./dat');


// 根据 tableList 
// 把数据按<主键名>归整在一起
const tableList = { //
  // pic : table名
  // PID : 主键名
  pic: 'PID',
  projoct: 'JID',
  pro_work: 'WID',
  user: 'UID',
  pro_user: null, // 没有<主键名>的就累加在一起

};

/*
数据导入时 , 进行处理
*/
const inBUF = {


  user: function (dat) {
    dat.FT = new Date(Date.parse(dat.FT));
    dat.LT = new Date(Date.parse(dat.LT));
  },

  pic: function (dat) {
    dat.FT = new Date(Date.parse(dat.FT));

  },


  pro_work: function (dat) {
    dat.txt = JSON.parse(dat.txt);
    dat.FT = new Date(Date.parse(dat.FT));

  },
}

// 发生变化 , 重新归纳统计
const changeBUF = {

  // 按每一天 , 归纳到 DAT.dateList 里面
  pro_work: function (box, arr) {

    // 归纳统计 
    var a = {};

    for (var x in arr) {
      var d = arr[x].FT.dayFormat();
      if (a[d])
        a[d] = [arr[x]];
      else
        a[d].push(arr[x]);
    }

    var b = [];
    for (var x in a)
      b.push({
        date: x,
        list: a[x],
      });

    // 排序
    b.sort(
      function (a, b) {
        if (a.date < b.date)
          return -1;
        else
          return 1;
      });

    DAT.dateList = b;
  },
}

// =====================================
function _SDB_(tList) {

  // this.MYDAT = {};
  this.BOX = {};
  // this.INDEX = {};
  //
  this.tableList = tList;

  // n : 'pro_work'  //表名
  this.getBUF = function (n) {
    return this.BOX[n];
  };

  this.setBUF = function (n, arr) {
    this.BOX[n] = arr;
  };

  this.jsonIN = function (D) {

    var o = this.tableList;
    for (var x in o) {
      if (o[x]) {
        this.jsonIN_1(x, o[x], D[x]);
      } else {
        this.jsonIN_null(x, D[x]);
      }
    }
  };

  // 有关键字的处理方法
  // 
  // T : table名
  // I : 主键名
  // A : 数据数组
  this.jsonIN_1 = function (T, I, A) {

    if (!A)
      return;
    if (!A.length)
      return;

    var o = this.BOX[T];
    if (!o)
      o = this.BOX[T] = {};

    // 导入处理函数
    var f = inBUF[T];
    var v;

    for (var x in A) {
      v = o[A[x][I]] = A[x];

      // 如果有导入处理函数
      if (f)
        f(v);
    }
  };

  // 没有关键字的处理方法
  // 
  // T : table名
  // I : 主键名 ( 这里没有 )
  // A : 数据数组
  this.jsonIN_null = function (T, A) {
    if (!A)
      return;
    if (!A.length)
      return;


    if (!this.BOX[T])
      this.BOX[T] = [];

    this.BOX[T] = this.BOX[T].concat(A)

    // 如果有导入处理函数
    var f = inBUF[T];
    if (f)
      for (var x in A)
        f(A[x])

  };
}

const buf = new _SDB_(tableList);

// module.exports = buf;

// 测试用 --- 
module.exports = {
  jsonIN: function (D) {

  }
}