// pages/run_time/run_time.js
const PAGE = require('../../class/page');
const SOUND = require('../../class_tb/c_sound');
const MISSION = require('../../class_tb/c_mission');
const ELEMENT = require('../../class_tb/c_element');
const SYS = require('../../class/sys.js');
const Url = require('../../class/url.js');
const ST = require('../../class/showtxt.js');

function TO() {
    var p = PAGE.pageObj();
    var m = MISSION.getBy执行包(执行包);
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
        var m = MISSION.getBy执行包(执行包);
        if (m.下一个元素(执行包)) {
            // 
            var ok_name = m.下一个元素Na(执行包) + '...>';
            this.setData({
                ready: true,
                // name: name,
                keyName: ok_name,
                // timeStr: SYS.秒ToStr('4512'),
            })
            // 
        } else {
            // Url.setPageBack('OK_end');
            PAGE.set('剩下时间', m.剩下时间(执行包));
            Url.post('任务结束');
            this.setData({
                ready: false,
                BKeyTxt: '结束...',
            })
        }
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
        PAGE.ready();
        // 
        执行包 = PAGE.get('m_box');
        var m = MISSION.getBy执行包(执行包);
        var ok_name = m.下一个元素Na(执行包) + '...>';
        this.setData({
            ready: true,
            // name: name,
            keyName: ok_name,
            // timeStr: SYS.秒ToStr('4512'),
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        clearTimeout(time1000);
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        clearTimeout(time1000);
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