// 
const A = getApp();
// 
function TO() {
    var p = A.PAGE.pageObj();
    var e = A.TAKEBACK.元素_数据(执行包);
    A.ELEMENT.计算显示(e);
    A.ELEMENT.播放声音(e);
    p.setData({
        xiaoji: A.SYS.秒ToStr(存款 - A.TAKEBACK.用掉的时间(执行包)),
        timeStr: e.time,
    });
    // m.循环执行(执行包);
    time1000 = setTimeout(TO, 1000);
}
var 存款;
var time1000;
var 执行包 = null;
// 
// 
function 重启() {
    var p = A.PAGE.pageObj();
    //
    A.PLAY.重置();
    // 
    执行包 = A.PAGE.get('m_box');
    var e = A.TAKEBACK.元素_数据(执行包);
    A.ELEMENT.取消漏播声音(e);
    // 
    p.setData({
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
    // 
    // run标记 = false;
    clearTimeout(time1000);
    A.PLAY.重置();
    wx.setKeepScreenOn({
        keepScreenOn: false
    });
    A.DAT.set_当前执行包(执行包);
}
// 
// 
Page({
    // 
    OK_key: function(e) {
        // this.setData({
        //   ready: false,
        //   BKeyTxt: '结束...',
        // })
        // 
        var e = A.TAKEBACK.元素_数据(执行包);
        // var m = A.TAKEBACK.getBy执行包(执行包);
        A.PAGE.set('用掉的时间', A.TAKEBACK.用掉的时间(执行包));
        // A.Url.setBackCall('OK_end');
        // A.Url.post('提款结束');
        // 
        A.PAGE.open('结束提款_密码');
    },
    cancel_key: function(e) { // 
        //
        A.PAGE.open('取消提款_密码');
    },
    重听: function(e) {
        if (A.SYS.测试) {
            A.TAKEBACK.快进(执行包);
            return;
        }
        A.PLAY.重听();
    },
    /**
     * 页面的初始数据
     */
    data: {
        BKeyTxt: '载入...',
        ready: false,
        Loading: true, // 按键设置
        keyType: 'default',
        hasOK: false,
        keyName: '-结束-',
    },
    // primary
    // default
    // warn
    onReady: function() {
        A.PAGE.ready();
        var u = A.USER.getByID(A.PAGE.get('UID'));
        存款 = u.存款();
        // 
        重启();
    },
    // 
    input_name: function(e) {
        input_str = e.detail.value;
        A.PAGE.set(A.PAGE.当前page().pageVN, input_str);
    },
    // 
    BKey: function(e) {
        if (A.SYS.非正式测试) {
            A.ST.show('----');
        }
        this.setData({
            ready: true,
        });
    },
    //
    OK_end: function(OK) {
        if (OK) {
            A.PAGE.pageBack()
        } else {
            this.setData({
                ready: false,
                BKeyTxt: '请稍后...',
            })
        }
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
    onShow: function() {
        if (A.PAGE.isDEL(this)) return;
        // 
        重启();
    },
    // 
    onHide: function() {
        关掉();
    },
})