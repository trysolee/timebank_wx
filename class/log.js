// 
const A = getApp();
// 
var Running = false;
var ARR = [];
const LOG = function(a) {
    // 
    ARR.unshift(a);
    if (Running) return;
    Running = true;
    var d;
    while (ARR.length > 0) {
        d = ARR.pop();
        if (d._VAL) {
            d.VAL = A.VAL[d._VAL];
        }
        if (d.VAL) {
            if (d.VAL.TXT) A.ST.show(d.VAL.TXT);
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
                A.Url.post(d.VAL.url);
            }
            if (d.VAL.PageJump) {
                A.PAGE.open(d.VAL.PageJump);
            }
            // 
        } else if (d._URL) {
            A.Url.post(d._URL);
            // 
        } else if (d.ShowTxt) {
            A.ST.setFun(d.FUN);
        }
    }
    Running = false;
};
module.exports = LOG;