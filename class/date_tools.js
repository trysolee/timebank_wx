
Date.prototype.dayFormat = function () {
  var y = this.getFullYear();
  var m = this.getMonth() + 1;
  var d = this.getDate();

  if (m < 10)
    m = '0' + m;

  if (d < 10)
    d = '0' + d;
  return y + '-' + m + '-' + d;
};


Date.prototype.timeFormat = function () {

  var h = this.getHours();
  var m = this.getMinutes();

  if (m < 10)
    m = '0' + m;

  return h + ':' + m ;
};

const DATE = {

  //
  day3: function (a) { // 返回当天和昨天,前天的范围

    var d = new Date(a);

    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);


    return {
      a0: new Date(d), // x < a 
      a1: new Date(d.setDate(d.getDate() - 1)),
      a2: new Date(d.setDate(d.getDate() - 1)),
      a3: new Date(d.setDate(d.getDate() - 1)),
      // 
      in: function (x) {
        if (x >= this.a0)
          return false;
        if (x < this.a3)
          return false;
        return true;
      },
      day1: function (x) { // 当天
        if (x >= this.a0)
          return false;
        if (x < this.a1)
          return false;
        return true;
      },
      day2: function (x) { // 昨天
        if (x >= this.a1)
          return false;
        if (x < this.a2)
          return false;
        return true;
      },
      day3: function (x) { // 前天
        if (x >= this.a2)
          return false;
        if (x < this.a3)
          return false;
        return true;
      },
    };
  },

};

module.exports = DATE;