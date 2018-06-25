// 
var ST = require('../class/showtxt.js');
// 
function set1(na, obj) {
    wx.setStorage({
        key: na,
        data: obj,
        success: function(res) {},
        fail: function(res) {},
    })
}
// 
function get1(na) {
    try {
        var value = wx.getStorageSync(na);
        return value;
    } catch (e) {
        return null;
    }
}
// 
const DAT = {
    get_提款: function(na) {
        return get1('提款_'.na);
    },
    set_提款: function(na, obj) {
        set1('提款_'.na, obj);
    },
    get_元素插入: function(na) {
        return get1('元素插入_'.na);
    },
    set_元素插入: function(na, obj) {
        set1('元素插入_'.na, obj);
    },
    get_声音组: function(na) {
        return get1('声音组_'.na);
    },
    set_声音组: function(na, obj) {
        set1('声音组_'.na, obj);
    },
    get_声音: function(na) {
        return get1('声音_'.na);
    },
    set_声音: function(na, obj) {
        set1('声音_'.na, obj);
    },
    get_任务: function(na) {
        return get1('任务_'.na);
    },
    set_任务: function(na, obj) {
        set1('任务_'.na, obj);
    },
    get_元素: function(na) {
        return get1('元素_'.na);
    },
    set_元素: function(na, obj) {
        set1('元素_'.na, obj);
    },
    get_SYS: function(na) {
        return get1('SYS_'.na);
    },
    set_SYS: function(na, obj) {
        set1('SYS_'.na, obj);
    },
};
module.exports = DAT;