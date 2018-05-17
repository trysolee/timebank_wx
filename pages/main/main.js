const LOG = require('../../class/log');
const BUF = require('../../class/buf');
const VAL = getApp().VAL;
var keyList = ['系统管理员', '转到其他项目' // 
    , '发出邀请', '新帖子', '地图'
];
var theList = [];
// 
// pages/main/main.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 
        list: [{
            bg: 1,
            id: 1,
            pic: '红小鸟.jpg',
            na: '小鸟的翅膀变成红色'
        }, {
            bg: 2,
            id: 2,
            pic: '黄小鸟.jpg',
            na: '小鸟的'
        }, {
            bg: 1,
            id: 2,
            pic: '黄小鸟.jpg',
            na: '飞上天,整理'
        }]
    },
    更多: function(a) {
        wx.showActionSheet({
            itemList: keyList,
            success: function(res) {
                var i = res.tapIndex;
                LOG({
                    VAL: VAL[keyList[i]], // 获取用户数据成功
                })
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        theList = [];
        var w = BUF.getBUF('work');
        var bg = 2;
        for (var i in w) {
            var o = w[i];
            if (++bg > 2) //
                bg = 1;
            theList.push({
                bg: bg,
                id: o.WID,
                // 
                // TODO
                // 下面的只是演示 ;
                pic: '红小鸟.jpg',
                na: '小鸟的翅膀变成红色'
            })
        }
        this.setData({
            list: theList
        })
    },
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
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})