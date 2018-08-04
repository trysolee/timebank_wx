// 
const A = getApp();
// 
// 
var MW = '';

function st(txt) {
    if (A.SYS.测试) {
        MW += txt + '\n';
    } else {
        MW = txt;
    }
    // var cp = PAGE.当前page();
    var po = A.PAGE.pageObj();
    var dat = po.data;
    if (dat.ready) {
        po.setData({
            ready: false,
            BTxt: MW,
            Loading: false, // 按键设置
            keyType: 'primary',
            BKeyTxt: '确认',
        });
    } else {
        po.setData({
            BTxt: MW,
        });
    }
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