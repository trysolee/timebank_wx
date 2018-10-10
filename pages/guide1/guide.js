// 
// 
var script = [{ // 间隔时间
    fun: function(data) {
        return false;
    },
    step: 1000,
}, {
    fun: function(data) {
        data.txt1 = true;
        // 
        return true;
    },
    step: 6000,
}, {
    fun: function(data) {
        data.txt2 = true;
        // 
        return true;
    },
    step: 4000,
}, {
    fun: function(data) {
        data.txt3 = true;
        // 
        return true;
    },
    step: 9500,
}, {
    fun: function(data) {
        data.txt4 = true;
        // 
        return true;
    },
    step: 4000,
}, {
    fun: function(data) {
        data.txt5 = true;
        // 
        return true;
    },
    step: 4000,
}, {
    fun: function(data) {
        data.key1 = true;
        // 
        return true;
    },
    step: -1,
}, ];
// 
const A = getApp();

function GO() {
    if (!run标记) return;
    // 
    var i = A.PAGE.get('_STEP');
    var o = script[i];
    var d = {};
    if (o.fun(d)) //
        A.PAGE.pageObj().setData(d);
    // 
    if (Number(o.step) > 0) {
        A.PAGE.set('_STEP', ++i);
        time1000 = setTimeout(GO, o.step);
    }
    // 
}
var run标记 = true;
var time1000;
// 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        txt1: false,
        txt2: false,
        txt3: false,
        txt4: false,
        txt5: false,
        key1: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        A.PAGE.set('_STEP', 0);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        GO();
    },
    OK_key: function(e) {
        // 
        // 
        A.PAGE.open('注册');
    },
})