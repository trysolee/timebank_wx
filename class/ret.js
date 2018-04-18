
const BUF = require('./buf');
const ST = require('./showtxt.js');


// 解析 : 服务器返回的数据 
// 
const RET = function (d) {

  ST.showJson(d);
  return;

  // TODO
  // 
  // 判断服务器返回状态
  // 

  BUF.jsonIN(d.BUF);

};

module.exports = RET;