const PAGE = require('../../class/page');
const MY = require('../../class/user_my');
const LOG = require('../../class/log.js');
const BUF = require('../../class/buf');
// 
// 
var theList = [];
// 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        BKeyTxt: '载入人员数据...',
        ready: false,
        Loading: true,
        list: theList
    },
    // 
    成员: function(r) {
        var i = r.target.id;
        if (i > 0) {
            var o = theList[i];
            PAGE.set('UID', o.UID);
            PAGE.set('userName', o.name);
            PAGE.set('JSON', o.JSON);
            LOG({
                _VAL: '人员权限',
            })
        }
    },
    callBack: function() {
        var li = [{
            // primary
            // default
            // warn
            type: 'default',
            na: PAGE.get('项目名') + ' . ' + PAGE.get('分组名'),
        }];
        // 
        var a = BUF.getBUF('pro_all_user');
        for (var i in a) {
            var x = a[i];
            var n = x.JSON.name;
            var r = x.JSON.role;
            // 
            // 如果有权限( 没有被删除 )
            var t = 'primary'; // or 'warn'
            if (r.lenght < 1) {
                t = 'warn';
                n = '[ 删 ] ' + n;
            } else if (r.indexOf('管理员') != -1) {
                n = n + ' [ 管 ]';
            }
            // 
            li.push({
                type: t,
                na: n,
                name: x.JSON.name,
                UID: x.UID,
                JSON: x.JSON,
                fun: '成员',
            })
        }
        theList = li;
        this.setData({
            list: theList,
            ready: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
})