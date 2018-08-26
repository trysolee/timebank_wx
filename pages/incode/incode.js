// pages/incode/incode.js
// 
const A = getApp();
var JID
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var scene = JID = decodeURIComponent(options.scene)
        A.PAGE.set('JID', scene);
    },
    onReady: function() {
        this.setData({
            Msg: JID,
        })
    },
})