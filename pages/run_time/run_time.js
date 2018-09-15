// 
const A = getApp();
// 
function TO() {
    var p = A.PAGE.pageObj();
    var m = A.MISSION.getBy执行包(执行包);
    var e = A.ELEMENT.getBy执行包(执行包);
    var o = {
        timeStr: A.SYS.秒ToStr(e.剩下时间(执行包)),
    };
    if (执行包.小计) {
        o.xiaoji = 执行包.小计;
    }
    p.setData(o);
    m.循环执行(执行包);
    time1000 = setTimeout(TO, 1000);
}
var time1000;
var 执行包 = null;
// 
Page({
    // 
    OK_key: function(e) {
        // 
        A.PLAY.重置();
        // var 执行包 = A.DAT.get_当前执行包();
        // 
        var m = A.MISSION.getBy执行包(执行包);
        if (m.下一个元素(执行包)) {
            // 
            var ok_name = m.下一个元素Na(执行包) + '...>';
            this.setData({
                ready: true,
                keyName: ok_name,
            })
            // 
        } else {
            // this.setData({
            //     ready: false,
            //     BKeyTxt: '结束...',
            // })
            // 
            A.PAGE.set('剩下时间', m.剩下时间(执行包));
            // A.Url.setBackCall('OK_end');
            // A.Url.post('任务结束');
            A.PAGE.open('结束任务_密码');
        }
    },
    取消: function(e) {
        this.setData({
            ready: false,
            BKeyTxt: '结束...',
        })
        // 
        A.Url.setBackCall('OK_end');
        A.Url.post('任务取消');
        // 
    },
    重听: function(e) {
        if (A.SYS.测试) {
            A.MISSION.快进(执行包);
            return;
        }
        A.PLAY.重听();
    },
    // OK_end: function(OK) {
    //     if (OK) PAGE.pageBack()
    // },
    /**
     * 页面的初始数据
     */
    data: {
        BKeyTxt: '载入...',
        ready: false,
        Loading: true, // 按键设置
        keyType: 'default',
        hasOK: false,
    },
    // primary
    // default
    // warn
    onReady: function() {
        A.PLAY.重置();
        A.PAGE.ready();
        // 
        执行包 = A.PAGE.get('m_box');
        var m = A.MISSION.getBy执行包(执行包);
        var e = A.ELEMENT.getBy执行包(执行包);
        e.取消漏播声音(执行包);
        //
        var ok_name = m.下一个元素Na(执行包) + '...>';
        var o = {
            ready: true,
            keyName: ok_name,
        };
        this.setData(o)
        // 
        TO();
        // 
        wx.setKeepScreenOn({
            keepScreenOn: true
        });
    },
    // 
    // input_name: function(e) {
    //     input_str = e.detail.value;
    //     A.PAGE.set(A.PAGE.当前page().pageVN, input_str);
    // },
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 
        wx.setKeepScreenOn({
            keepScreenOn: true
        });
        执行包 = A.DAT.get_当前执行包();
        // 
        var e = A.ELEMENT.getBy执行包(执行包);
        e.取消漏播声音(执行包);
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        // clearTimeout(time1000);
        A.DAT.set_当前执行包(执行包);
        wx.setKeepScreenOn({
            keepScreenOn: false
        });
        // 
        执行包 = '';
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        clearTimeout(time1000);
        A.PLAY.重置();
        A.PAGE.pageBack_标志(this);
        wx.setKeepScreenOn({
            keepScreenOn: false
        });
        A.DAT.set_当前执行包(执行包);
    },
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