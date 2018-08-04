// 
const A = getApp();
// 
Page({
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
    onReady: function() {
        A.PAGE.ready();
        // 
        var o = A.PAGE.当前page();
        if (o.LOAD_URL) {
            A.Url.setBackCall('callBack');
            A.Url.post(o.LOAD_URL);
        } else {
            this.callBack();
        }
        // 
    },
    callBack: function() {
        var cp = A.PAGE.当前page();
        var li = cp.datList();
        A.PAGE.set('theList', li);
        // 
        var key_na = '确定';
        if (cp.OK_name) key_na = cp.OK_name;
        this.setData({
            list: li,
            ready: true,
            OK_name: key_na,
        })
    },
    OK_key: function() {
        var p = A.PAGE.当前page();
        var a = A.PAGE.get('theList');
        var l = [];
        // 
        for (var i = 0; i < a.length; i++) {
            if (a[i].chk)
                if (a[i].type == 'primary') {
                    l.push(a[i].name)
                }
        }
        // 
        if (p.OK_fun) {
            p.OK_fun(l, a);
        }
        // 
        if (p.OK_URL) {
            A.Url.setPageBack('OK_end');
            A.Url.post(p.OK_URL);
            this.setData({
                ready: false,
                BKeyTxt: '请稍后...',
            })
        } else {
            this.OK_end(true);
        }
    },
    OK_end: function(OK) {
        if (OK) A.PAGE.pageBack()
    },
    chk: function(r) {
        var index = r.target.id;
        var li = A.PAGE.get('theList');
        var o = li[index];
        if (o.chk) {
            if (o.type == 'primary') {
                o.type = 'default'
            } else {
                o.type = 'primary'
            }
            this.setData({
                list: li
            })
        }
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        A.PAGE.pageBack_标志(this);
    },
})