// 
const A = getApp();
// 
var input_str = '';
var 测试_执行包 = null;
// 
var END_page = null;
// 
Page({
    //
    // 测试入口
    OK_key: function(e) {
        // 
        var p = A.PAGE.当前page();
        if (p.OK_fun) {
            var s = A.PAGE.get(p.pageVN);
            p.OK_fun(s);
        }
        if (p.OK_page) {
            A.PAGE.open(p.OK_page);
            // 
        } else if (p.OK_URL) {
            A.Url.setBackCall('OK_end');
            A.Url.post(p.OK_URL);
            this.setData({
                ready: false,
                BKeyTxt: '请稍后...',
            })
        } else {
            this.OK_end(true);
        }
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
    },
    // primary
    // default
    // warn
    onReady: function() {
        A.PAGE.ready();
        // 
        var p = A.PAGE.当前page();
        var msg = '';
        END_page = p.END_page;
        // 
        var ok_name = '确定';
        var name; // 输入提示
        if (p.OK_name) ok_name = p.OK_name;
        // 
        if (p.getStr) {
            name = p.getStr();
            A.PAGE.set(p.pageVN, name);
        } else {
            name = A.PAGE.get(p.pageVN)
        }
        // 
        if (p.msg) msg = p.msg;
        // 
        this.setData({
            ready: true,
            name: name,
            keyName: ok_name,
            Msg: msg,
        })
        // 
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
            if (END_page) {
                A.PAGE.open(END_page);
                return;
            }
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
        if (!END_page) // 
            A.PAGE.pageBack_标志(this);
    },
})