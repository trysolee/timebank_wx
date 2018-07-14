// pages/run_time/run_time.js
const PAGE = require('../../class/page');

const SYS = require('../../class/sys.js');

// 
var T = 11;
var J = 0;

function TO() {
  var p = PAGE.pageObj();
  T--;
  if (J++ > 2000)
    return;
  p.setData({
    timeStr: SYS.秒ToStr(T),
  })
  setTimeout(TO, 1000);
}

var input_str = '';
var 测试_执行包 = null;
// 

Page({
  // 测试入口
  OK_key: function(e) {
    if (SYS.非正式测试) {

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
    var ok_name = '吃早餐_喝水...>';
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
      timeStr: SYS.秒ToStr('4512'),
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
  onLoad: function(options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})