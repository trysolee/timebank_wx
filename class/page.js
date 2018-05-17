const ST = require('./showtxt.js');
// 
const Page = {
    // 接受邀请 , 输入二维码
    邀请码: {
        url: '../incode/incode',
        返回: null, // 没有返回键
    },
    首页: {
        url: '../main/main',
        返回: null, // 没有返回键
    },
    帖子: {
        url: '../work/work',
        返回: '首页',
    },
    // 
    // 用于 转到其他项目
    项目列表: {
        url: '../admin1/admin1',
        返回: '上一页',
    },
    项目人员: {
        url: '../admin2/admin2',
        返回: '上一页',
        返回连接: null,
    },
    人员权限: {
        url: '../admin3/admin3',
        返回: '上一页',
    },
    修改项目名称: {
        url: '../fix_xm_name/fix_xm_name',
        返回: '上一页',
    },
};
var BOX = [{
    dat: {}
}];
// 
const obj = {
    open: function(p) {
        // 
        ST.reSet();
        // 
        var o = Page[p];
        //
        var u = o.url;
        if (o.返回 == '上一页') {
            wx.navigateTo({
                url: u,
            })
        } else if (!o.返回) {
            BOX = [];
            wx.reLaunch({
                url: u,
            })
        } else {
            wx.redirectTo({
                url: u,
            })
        }
        // 
        BOX.unshift({
            page: o,
            dat: {},
        });
    },
    //   
   
    // 设置 数值
    set: function(n, v) {
        if (BOX.length > 0) {
            // if (!BOX[0][dat]) BOX[0][dat] = [];
            BOX[0]['dat'][n] = v;
        }
    },
    get: function(n) {
        for (var i = 0; i < BOX.length; i++) {
            if (BOX[i]['dat'][n] != null) // 
                return BOX[i]['dat'][n];
        }
        return null;
    },
}
module.exports = obj;