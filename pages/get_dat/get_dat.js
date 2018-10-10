// pages/get_dat/get_dat.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        var s = JSON.parse('{"i":"123"}');
        wx.request({
            // url: o.url,
            url: 'http://localhost/tb2_12/cs.js',
            data: {},
            success: function(res) {
                var i = res.data;
                // var j = JSON.parse(i);
            },
            fail: function(ret) {
                var i = ret;
            },
            method: 'POST',
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
                // 'content-type': 'application/json;charset=utf8'
                // 'content-type': 'txt/json;charset=utf8'
            },
        })
    },
   
})