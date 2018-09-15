// 
// 
//  
const A = getApp();
// 
function set1(na, obj) {
    wx.setStorage({
        key: na,
        data: obj,
        success: function(res) {
            var a = res;
        },
        fail: function(res) {
            var a = res;
        },
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
    get_user: function(uid) {
        return A.BUF.getOne('user', uid);
    },
    // set_user: function(uid, obj) {
    //     // set1('U_' + uid, obj);
    // },
    get_提款: function(na) {
        return get1('TK_' + na);
    },
    set_提款: function(na, obj) {
        set1('TK_' + na, obj);
    },
    get_元素插入: function(na) {
        return get1('EI_' + na);
    },
    set_元素插入: function(na, obj) {
        set1('EI_' + na, obj);
    },
    get_声音: function(na) {
        return get1('S_' + na);
    },
    set_声音: function(na, obj) {
        set1('S_' + na, obj);
    },
    get_任务: function(na) {
        return get1('MS_' + na);
    },
    set_任务: function(na, obj) {
        set1('MS_' + na, obj);
    },
    get_元素: function(na) {
        return get1('E_' + na);
    },
    set_元素: function(na, obj) {
        set1('E_' + na, obj);
    },
    get_SYS: function(na) {
        return get1('SYS_' + na);
    },
    set_SYS: function(na, obj) {
        set1('SYS_' + na, obj);
    },
    get_当前执行包: function() {
        var uid = A.PAGE.get('UID');
        return get1('ZXB_' + uid);
    },
    set_当前执行包: function(obj) {
        var uid = A.PAGE.get('UID');
        set1('ZXB_' + uid, obj);
    },
};
module.exports = DAT;