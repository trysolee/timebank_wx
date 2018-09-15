// 
const A = getApp();
// 
function TO() {
    var p = A.PAGE.pageObj();
    //
    var e = A.ELEMENT.当前元素_数据(执行包);
    A.ELEMENT.计算显示(e);
    A.ELEMENT.播放声音(e);
    p.setData({
        _List: 执行包.元素组
    });
    time1000 = setTimeout(TO, 1000);
}
var time1000;
var 执行包 = null;

function 重启() {
    var p = A.PAGE.pageObj();
    //
    A.PLAY.重置();
    设置静音按键名();
    // 
    执行包 = A.PAGE.get('m_box');
    A.ELEMENT.计算显示(A.ELEMENT.当前元素_数据(执行包));
    A.ELEMENT.取消漏播声音(执行包);
    // 
    p.setData({
        _List: 执行包.元素组,
        ready: true,
    });
    // 
    wx.setKeepScreenOn({
        keepScreenOn: true
    });
    // 
    TO();
}

function 关掉() {
    var p = A.PAGE.pageObj();
    if (!p.data.ready) return;
    // 
    clearTimeout(time1000);
    A.PLAY.重置();
    wx.setKeepScreenOn({
        keepScreenOn: false
    });
    A.DAT.set_当前执行包(执行包);
}

function 设置静音按键名() {
    var p = A.PAGE.pageObj();
    var s = '- 静音 -';
    if (A.PLAY.get静音()) {
        s = '打开声音';
    }
    p.setData({
        mute_key_name: s,
    });
}
// 
// 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        BKeyTxt: '载入...',
        ready: false,
        Loading: true, // 按键设置
    },
    // 
    OK_key: function(e) { // 
        // 
        A.PAGE.set('剩下时间', A.ELEMENT.剩下时间(执行包));
        A.PAGE.open('结束任务_密码');
    },
    cancel_key: function(e) { // 
        //
        A.PAGE.open('取消任务_密码');
    },
    mute_key: function(e) { // 
        //
        A.PLAY.set静音();
        设置静音按键名();
    },
    key_next: function(r) {
        var index = r.target.id;
        // 
        A.ELEMENT.元素转换(执行包, index);
        // 
    },
    onReady: function() {
        重启();
        A.PAGE.ready();
        // 
        var list = [{
            keyNa: '起床',
            time: '12:00',
            isKey: true,
            type: 'primary',
        }, {
            keyNa: '刷牙洗脸',
            time: '5:00',
            isKey: false,
            type: 'default',
        }, ];
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        重启();
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        关掉();
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        关掉();
        A.PAGE.pageBack_标志(this);
    },
})