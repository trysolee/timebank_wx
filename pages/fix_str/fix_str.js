// pages/fix_str/fix_str.js
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
        hasOK: false,
    },
    onReady: function() {
        PAGE.ready();
        // 
        var p = PAGE.当前page();
        var ok_name = '确定';
        if (p.OK_name) ok_name = p.OK_name;
        // 
        var name;
        if (p.getStr) {
            name = p.getStr();
            PAGE.set(p.pageVN, name);
        } else {
            name = PAGE.get(p.pageVN)
        }
        // 
        this.setData({
            ready: true,
            name: name,
            keyName: ok_name,
        })
    },
    // 
    input_name: function(e) {
        PAGE.set(PAGE.当前page().pageVN, e.detail.value);
    },
    // 
    OK_key: function(e) {
        var p = PAGE.当前page();
        if (p.OK_fun) {
            var s = PAGE.get(p.pageVN);
            p.OK_fun(s);
        }
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
})