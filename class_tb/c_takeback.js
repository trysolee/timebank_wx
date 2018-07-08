// 
// 
var ELEMENT;
var DAT;
// 
var atFirst = true;
const init = function() {
    if (atFirst) {
        atFirst = false;
        // 
        ELEMENT = require('./c_element');
        DAT = require('./s_dat');
    }
}
// 
// 提款
const FUN = function(B) {
    // 
    init();
    // 
    this.BUF = B;
    // 
    this.名称 = function() { // 名称
        return this.BUF.Na;
    };
    this.创建_执行包 = function() { // 
        // 
        var dat = {
            提款: this.名称(),
            提款_开始时刻: new Date(),
        };
        // 
        return dat;
    };
}
// 
const TAKEBACK = {
    // 
    getByNa: function(Na) {
        return new FUN( //
            DAT.get_提款(Na) //
        );
    },
    //
    getBy执行包: function(dat) {
        var o = TAKEBACK.getByNa(dat.提款);
        return o;
    },
    //
    // na : 声音名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        // 
        init();
        // 
        var d = DAT.get_提款(na);
        if (d) {
            // 
            if (d.版本 == o.版本) {
                return;
            }
            // 
            o.DAT = d.DAT
        } else {
            o.DAT = {};
        }
        o.Na = na; // 记录 名称
        // 
        DAT.set_提款(na, o);
    },
    // 
    任务列表: function() {
        //
    },
};
module.exports = TAKEBACK;