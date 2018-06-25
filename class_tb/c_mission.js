// 
// 
const ELEMENT = require('./c_element');
// 
// 任务
const FUN = function(B) {
    this.BUF = B;
    this.名称 = function() { // 任务名称
        // return this.BUF.JID;
    };
    this.第一个元素Na = function() { //
        // return this.BUF.JID;
    };
    this.下一个元素 = function(执行包_dat) { //
        // return this.BUF.JID;
    };
    this.创建_执行包 = function() { // 任务id
        var 元素na = this.第一个元素Na();
        var 元素obj = ELEMENT.getByNa(元素na);
        // 
        var dat = {
            任务: this.名称(),
            元素: 元素na,
            当前元素下标: 0, // 
            任务_开始时刻: new Date(),
            元素_开始时刻: new Date(),
            时刻轴: 元素obj.创建_时刻轴();
        };
        // 
        return dat;
    };
    this.循环执行 = function() {
        //
    };
}
// 
const MISSION = {
    //
    // na : 声音名称
    // o : DAT ( JSON )
    初始化: function(na, o) {
        //
        // 
        var d = DAT.get_声音(na);
        if (d) {
            // 
            if (d.版本 == o.版本) {
                return;
            }
            // 
            o.DAT = d.DAT
        } else {
            var y = o.元素;
            var i = 0;
            for (var x in y) {
                var o1 = ELEMENT.getByNa(y[x]);
                i += Number(o1.时长());
            }
            o.DAT.时长 = i;
        }
        // 
        DAT.set_任务(na, o);
    },
    // 
    // 根据当前时间
    // 列出最可能执行的任务
    任务列表: function() {
        //
    },
    getByNa: function(Na) {},
};
module.exports = MISSION;