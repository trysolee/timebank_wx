// const A = getApp();
//
const chk = function(r, s) {
    return r.test(s);
}
const ID = /^\d{1,10}$/;
const 实数 = /^(-?\d+)(\.\d+)?$/;
const 整数 = /^-?\d+$/;
const 昵称 = /^[\w\u4e00-\u9fa5]{2,8}$/;
const 用户名 = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
const 邀请码 = /^\d{6}$/; // 6位数
const 短密 = /^\d{3}$/; // 3位数
// 
const INPUT = {
    ID: {
        chk: function(v) { // 正整数
            return chk(ID, v);
        },
        msg: function() { //
            return 'ID必须是正整数';
        },
    },
    实数: {
        chk: function(v) { //
            return chk(实数, v);
        },
        msg: function() { //
            return '必须是数字';
        },
    },
    整数: {
        chk: function(v) { //
            return chk(整数, v);
        },
        msg: function() { //
            return '必须是数字,不能有小数点';
        },
    },
    正整数: {
        chk: function(v) { //
            return chk(ID, v);
        },
        msg: function() { //
            return '必须是纯数字,不能有符号';
        },
    },
    邀请码: {
        chk: function(v) { //
            return chk(邀请码, v);
        },
        msg: function() { //
            return '必须6位数字';
        },
    },
    短密: {
        chk: function(v) { //
            return chk(短密, v);
        },
        msg: function() { //
            return '必须3位数字';
        },
    },
    昵称: {
        chk: function(v) { //
            return chk(昵称, v);
        },
        msg: function() { //
            return '必须2~8个字符,不能有符号';
        },
    },
    年龄: {
        chk: function(v) { //
            if (!chk(ID, v)) return false;
            if (Number(v) < 3) return false;
            if (Number(v) > 12) return false;
            return true;
        },
        msg: function() { //
            return '必须3~12岁';
        },
    },
}
module.exports = INPUT;