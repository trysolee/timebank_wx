const PAGE = require('../../class/page');
const Url = require('../../class/url.js');
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
    onReady: function() {
        PAGE.ready();
        // 
        var o = PAGE.当前page();
        if (o.LOAD_URL) {
            Url.setPageBack('callBack');
            Url.post(o.LOAD_URL);
        } else {
            this.callBack();
        }
        // 
    },
    callBack: function() {
        var cp = PAGE.当前page();
        var li = cp.datList();
        PAGE.set('theList', li);
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
        var p = PAGE.当前page();
        var a = PAGE.get('theList');
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
            Url.setPageBack('OK_end');
            Url.post(p.OK_URL);
            this.setData({
                ready: false,
                BKeyTxt: '请稍后...',
            })
        } else {
            this.OK_end(true);
        }
    },
    OK_end: function(OK) {
        if (OK) PAGE.pageBack()
    },
    chk: function(r) {
        var index = r.target.id;
        var li = PAGE.get('theList');
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
})