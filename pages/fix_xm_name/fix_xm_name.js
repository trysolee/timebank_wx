// 修改 <项目名> 或者 <分组名>
// 
// pages/fix_zm_name/fix_xm_name.js
const PAGE = require('../../class/page');
const LOG = require('../../class/log.js');
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
            name: PAGE.get('name'),
            keyName: PAGE.get('OKkey_name'),
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        PAGE.ready();
        // 
        var p = PAGE.当前page();
        var ok_name = '确定';
        if (p.OK_name) ok_name = p.OK_name;
        // 
        var name;
        if (p.getStr) {
            name = p.getStr();
            PAGE.set(p.pageVN, name);
        } else {
            name = PAGE.get(p.pageVN)
        }
        // 
        this.setData({
            name: name,
            keyName: ok_name,
        })
    },
    // 
    input_name: function(e) {
        PAGE.set(PAGE.当前page().pageVN, e.detail.value);
    },
    OK_key: function(e) {
        var p = PAGE.当前page();
        if (p.OK_fun) {
            var s = PAGE.get(p.pageVN);
            p.OK_fun(s);
        }
        // 
        LOG({
            _URL: p.OK_URL,
        })
    },
})