var ST;
var PAGE;
var Url;
var APP;
var VAL;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        ST = require('./showtxt.js');
        PAGE = require('./page');
        Url = require('./url');
        VAL = require('./val');
        VAL.init();
    }
}
// 
// 
var Running = false;
var ARR = [];
const LOG = function(a) {
    init();
    // 
    ARR.unshift(a);
    if (Running) return;
    Running = true;
    var d;
    while (ARR.length > 0) {
        d = ARR.pop();
        if (d._VAL) {
            d.VAL = VAL[d._VAL];
        }
        if (d.VAL) {
            if (d.VAL.TXT) ST.show(d.VAL.TXT);
            if (d.VAL.FUN) {
                // 如果 有 FUN , 就要确保有 DAT
                // 这样可以 通过FUN 设置 DAT 
                // 为 <url> 备用
                if (!d.DAT) {
                    d.DAT = [];
                }
                d.VAL.FUN(d.DAT);
            }
            if (d.VAL.url) {
                Url.post(d.VAL.url);
            }
            if (d.VAL.PageJump) {
                PAGE.open(d.VAL.PageJump);
            }
            // 
        } else if (d._URL) {
            Url.post(d._URL);
            // 
        } else if (d.ShowTxt) {
            ST.setFun(d.FUN);
        }
    }
    Running = false;
};
module.exports = LOG;