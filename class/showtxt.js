// 
const SYS = require('./sys.js');
// 
// 
var MW = '';

function st(txt) {
    if (SYS.测试) {
        MW += txt;
    } else {
        MW = txt;
    }
    wx.showToast({
        title: MW,
        duration: 2000
    })
}
const Show = {
    fun: st,
    reSet: function() {
        MW = '';
        this.fun = st;
    },
    setFun: function(f) {
        this.fun = f;
    },
    show: function(txt) {
        if (this.fun) this.fun(txt);
    },
    showJson: function(json) {
        if (this.fun) this.fun(JSON.stringify(json));
    },
};
module.exports = Show;