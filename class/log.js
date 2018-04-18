
const ST = require('./showtxt.js');

var PageJump;

var Running = false;

var ARR = [];


const LOG = function (a) {

  ARR.unshift(a);

  if (Running)
    return;

  Running = true;

  var d;

  while (ARR.length > 0) {


    d = ARR.pop();

    if (d.VAL) {
      ST.show(d.VAL.TXT);

      if (d.VAL.FUN)
        d.VAL.FUN(d.DAT);

      if (PageJump) {
        var f = PageJump[d.VAL];
        if (f)
          f(d.DAT);
      }

    } else if (d.PageJump) {
      PageJump = d.PageJump;

    } else if (d.ShowTxt) {
      ST.setFun(d.FUN);

    }
  }

  Running = false;
};

module.exports = LOG;