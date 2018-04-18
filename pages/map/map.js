const BUF = require('../../class/buf');
const DATE = require('../../class/date_tools');
const DAT = require('../../class/dat');

var markDay1 = function (dat) {

  // TODO
  // 返回 <目标天>的 marker
};

var markDay2 = function (dat) {

  // TODO
  // 返回 <昨天>的 marker
};

var markDay3 = function (dat) {

  // TODO
  // 返回 <前天>的 marker
};

// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    markers: [{
      iconPath: "w1.png",
      id: 34567,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      alpha: 75
    }],

  },

  markertap: function (ret) {
    console.log(ret.markerId);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var arr = [];

    // 获取<目标天>
    var day3 = DATE.day3(DAT.theDay);

    var index = DAT.dateListIndex;
    var date = DAT.dateList;

    var d = date[index].list;
    for (var x in d)
      arr.push(markDay1(d[x]));

    index++;
    d = date[index].list;
    for (var x in d)
      arr.push(markDay2(d[x]));

    index++;
    d = date[index].list;
    for (var x in d)
      arr.push(markDay3(d[x]));

    this.setData({
      markers: arr
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