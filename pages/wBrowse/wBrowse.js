
const sample = {

  inputing : false,

  gpsReady : false,

  gpsFail : false,

  picKeyName : '拍照 ( GPS... )',

  // ======================

  Open: 2, // 状态 , 开放回复 , 关闭回复

  Type: 2, // 发现异常  , 日常工作

  WT: '断枝清除',

  msg: [{
    id: 1,
    Un: '刘红军',
    D: '2018-01-14 10:30', // fixTime
    P: 'timg.jpg',
    // TODO 
    // 一个人连续发图 只显示一次人名
    // 一个人连续发图 , 点击显示多张图
    C: 1, // 单 / 双 
    chk: [0] // 点击预览 // 可以是一张 或一组图
  }, {
    id: 2,
    // Un : null , // 没有 Un 说明跟上一个相同 , 不用显示
    T: '今天天气很好',
    C: 1, // 一定会有 
    // chk / 没有<chk> 就没有点击

  }, {
    id: 3,
    Un: 'Arst life',
    D: '2018-01-14 11:30',
    P: 'http://tryso.gz01.bdysite.com/upload/a1.png',
    C: 2,
    chk: [2, 3] // index array
  }, {
    id: 4,
    P: 'http://tryso.gz01.bdysite.com/upload/pic.png',
    C: 2,
    chk: [2, 3]// index array

  }, {
    id: 5,
    T: '去哪里浪\n带上我.',
    C: 2,
  }],

}


// pages/wBrowse/wBrowse.js
Page({

  /**
   * 页面的初始数据
   */
  data: sample,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  chkImage: function (event) {
    var id = event.target.id;
    var msg = this.data.msg;
    var picArr = msg[id].chk;
    var cURL = msg[id].P;

    var arr = [];
    for (var x in picArr)
      arr.push(msg[picArr[x]].P);

    wx.previewImage({
      current: cURL, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },

  textInput: function (ret) {
    var a = ret;

    console.log(a);

  },

  isInput: function () {
    this.setData({
      inputing: true
    })

  },

  notInput: function () {
    this.setData({
      inputing: false
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})