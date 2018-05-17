// pages/login/login.js
// var VAL = require('../../class/val.js');
var LOG = require('../../class/log.js');
// var ShowTxt = require('../../class/showtxt.js');
const VAL = getApp().VAL;
var TXT = '';
//
Page({
    /**
     * 页面的初始数据
     */
    data: {
        motto: 'Hello World\n123',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        txt: '',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 设置 ShowTxt 的 处理函数
        LOG({
            ShowTxt: true,
            FUN: t => {
                TXT += t + '\n';
                this.setData({
                    txt: TXT
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        LOG({
            VAL: VAL.GO_LOGIN
        })
    },
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