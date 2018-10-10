// 
const A = getApp();
// 
var input_str = '';
var 测试_执行包 = null;
// 
var back_标志 = null;
// 
Page({
    //
    // 
    OK_key: function(e) {
        // 
        var p = A.PAGE.当前page();
        if (p.OK_fun) {
            var s = A.PAGE.get(p.pageVN);
            if (!p.OK_fun(s)) return;
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
        back_标志 = p.back_标志;
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
        var dat = {
            ready: true,
            name: name,
            keyName: ok_name,
            Msg: '',
            password: false,
            input_type: 'text',
            input_max: '64',
        };
        if (p.类型 == '数字') {
            dat.input_type = 'number';
        };
        if (p.密码) {
            dat.password = true;
        };
        if (p.长度) {
            dat.input_max = p.长度;
        };
        // 
        if (p.msg) {
            dat.Msg = p.msg;
        } else if (p.msg_fun) {
            dat.Msg = p.msg_fun();
        }
        // 
        this.setData(dat);
        // 
    },
    // 
    input_name: function(e) {
        input_str = e.detail.value;
        A.PAGE.set(A.PAGE.当前page().pageVN, input_str);
        // 
        // this.OK_key();
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
            if (back_标志) {
                A.PAGE.pageBackTo(back_标志);
                return;
            }
            A.PAGE.pageBack(this);
        } else {
            this.setData({
                ready: false,
                BKeyTxt: '错误...',
            })
        }
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        if (A.PAGE.isDEL(this)) return;
        // 
        if (!back_标志) // 
            A.PAGE.pageBack_onUnload();
    },
})