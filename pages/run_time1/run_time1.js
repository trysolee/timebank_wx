// 
const A = getApp();
// 
function TO() {
    if (run标记) {
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
}
var run标记 = false;
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
    run标记 = true;
    TO();
}

function 关掉() {
    // 
    run标记 = false;
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
        A.PLAY.重置();
        // 
        A.ELEMENT.元素转换(执行包, index);
        // 
    },
    onReady: function() {
        重启();
        A.PAGE.ready();
        // 
        // ready 立即 save
        // 避免 在<run_time>页面意外退出 ,
        // 没有保存到本地
        A.DAT.set_当前执行包(执行包);
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (A.PAGE.isDEL(this)) return;
        // 
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
        if (A.PAGE.isDEL(this)) return;
        // 
        关掉();
        A.PAGE.pageBack_onUnload();
    },
})