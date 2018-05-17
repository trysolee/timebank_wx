// pages/fix_zm_name/fix_xm_name.js
const PAGE = require('../../class/page');
const LOG = require('../../class/log.js');
const SYS = require('../../class/sys.js');
const VAL = getApp().VAL;
// 
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            name: PAGE.get('项目名'),
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    // 
    input_name: function(e) {
        PAGE.set('input_name', e.detail.value);
    },
    OK_key: function(e) {
        // 
        LOG({
            _URL: '修改项目名称',
        })
    },
})