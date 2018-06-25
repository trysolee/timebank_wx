// 
var SYS;
var PAGE;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        SYS = require('./sys');
        PAGE = require('./page');
    }
}
// 
// 
var MW = '';

function st(txt) {
    init();
    if (SYS.测试) {
        MW += txt + '\n';
    } else {
        MW = txt;
    }
    // var cp = PAGE.当前page();
    var po = PAGE.pageObj();
    var dat = po.data;
    if (dat.ready) {
        po.setData({
            ready: false,
            BTxt: MW,
            Loading: false, // 按键设置
            keyType: 'primary',
            BKeyTxt: '确认',
        });
    }else{
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