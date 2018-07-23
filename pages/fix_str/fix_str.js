// pages/fix_str/fix_str.js
const PAGE = require('../../class/page');
const Url = require('../../class/url.js');
const ST = require('../../class/showtxt.js');
const SYS = require('../../class/sys.js');
// 
const FIRST = require('../../class_tb/s_first');
// 
var input_str = '';
var 测试_执行包 = null;
// 
Page({
    //
    // 测试入口
    OK_key: function(e) {
        if (SYS.非正式测试) {
            if (input_str == '') {
                测试_执行包 = FIRST.测试1();
                // 
            } else if (input_str == 'p') {
                FIRST.测试2(测试_执行包);
                // 
            } else if (input_str == 's') {
                FIRST.测试3();
                // 
            }
            return;
        }
        // 
        // 
        // 
        // 
        var p = PAGE.当前page();
        if (p.OK_fun) {
            var s = PAGE.get(p.pageVN);
            p.OK_fun(s);
        }
        if (p.OK_page) {
            PAGE.open(p.OK_page);
            // 
        } else if (p.OK_URL) {
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
        PAGE.ready();
        // 
        var p = PAGE.当前page();
        var ok_name = '确定';
        var name; // 输入提示
        if (p.OK_name) ok_name = p.OK_name;
        // 
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
        // 
    },
    // 
    input_name: function(e) {
        input_str = e.detail.value;
        PAGE.set(PAGE.当前page().pageVN, input_str);
    },
    // 
    BKey: function(e) {
        if (SYS.非正式测试) {
            ST.show('----');
        }
        this.setData({
            ready: true,
        });
    },
    //
    OK_end: function(OK) {
        if (OK) {
            PAGE.pageBack()
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

        var p = PAGE.当前page();
         wx.navigateBack();

    },
})