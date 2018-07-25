// pages/run_time/run_time.js
const PAGE = require('../../class/page');
const SOUND = require('../../class_tb/c_sound');
const TAKEBACK = require('../../class_tb/c_takeback');
const ELEMENT = require('../../class_tb/c_element');
const SYS = require('../../class/sys.js');
const Url = require('../../class/url.js');
const ST = require('../../class/showtxt.js');

function TO() {
    var p = PAGE.pageObj();
    var m = TAKEBACK.getBy执行包(执行包);
    var e = ELEMENT.getBy执行包(执行包);
    p.setData({
        timeStr: SYS.秒ToStr(e.剩下时间(执行包)),
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
        this.setData({
            ready: false,
            BKeyTxt: '结束...',
        })
        // 
        var m = TAKEBACK.getBy执行包(执行包);
        PAGE.set('用掉的时间', m.用掉的时间(执行包));
        Url.setPageBack('OK_end');
        Url.post('提款结束');
        // 
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
        keyName: '-结束-',
    },
    // primary
    // default
    // warn
    onReady: function() {
        PAGE.ready();
        // 
        执行包 = PAGE.get('m_box');
        var m = TAKEBACK.getBy执行包(执行包);
        this.setData({
            ready: true,
        })
        // 
        TO();
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
        clearTimeout(time1000);
        PAGE.pageBack();
    },
})