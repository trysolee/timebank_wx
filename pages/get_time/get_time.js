// 
const A = getApp();
// 
function TO() {
    var p = A.PAGE.pageObj();
    var m = A.TAKEBACK.getBy执行包(执行包);
    var e = A.ELEMENT.getBy执行包(执行包);
    p.setData({
        timeStr: A.SYS.秒ToStr(e.剩下时间(执行包)),
    });
    m.循环执行(执行包);
    time1000 = setTimeout(TO, 1000);
}
var time1000;
var 执行包 = null;
// 
Page({
    // 
    OK_key: function(e) {
        // this.setData({
        //   ready: false,
        //   BKeyTxt: '结束...',
        // })
        // 
        var m = A.TAKEBACK.getBy执行包(执行包);
        A.PAGE.set('用掉的时间', m.用掉的时间(执行包));
        // A.Url.setBackCall('OK_end');
        // A.Url.post('提款结束');
        // 
        A.PAGE.open('结束提款_密码');
    },
    取消: function(e) {
        this.setData({
            ready: false,
            BKeyTxt: '结束...',
        })
        // 
        A.Url.setBackCall('OK_end');
        A.Url.post('提款取消');
        // 
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
        // 
        执行包 = A.PAGE.get('m_box');
        var m = A.TAKEBACK.getBy执行包(执行包);
        this.setData({
            ready: true,
        })
        // 
        TO();
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
        clearTimeout(time1000);
        A.PAGE.pageBack_标志(this);
    },
})