// pages/wSelType/wSelType.js

var sel = -1;

const upFile = require('../../class/upfile');

var SYS = require('../../class/sys');


var latitude;
var longitude;
var gpsOK = false;
var selArr;

Page({



  /**
   * 页面的初始数据
   */
  data: {

    keyName: 'GPS...',

    loading: true,

    listDate: [{
      id: 1,
      na: '公主裙',
      t: 'noSel'
    }, {
      id: 2,
      na: '友馨苑',
      t: 'noSel'
    }, {
      id: 3,
      na: '中山市公司',
      t: 'noSel'
    }, {
      id: 4,
      na: '骑单车',
      t: 'noSel'
    }]

  },

  listKey: function (r) {

    var id = r.target.id;
    var d = this.data.listDate
    if (d[id].t == 'noSel')
      d[id].t = 'sel'
    else
      d[id].t = 'noSel';

    this.setData({
      listDate: d
    })
  },


  takePic: function (r) {

    selArr = new Array();
    var o = this.data.listDate;
    for (var x in o)
      if (o[x].t == 'sel')
        selArr.push(o[x].id);

    if (selArr.length < 1) {
      wx.showModal({
        title: '提示',
        content: '至少一个关键字',
        showCancel: false,
      })
      return;
    }

    wx.chooseImage({
      count: 1,
      sizeType: ['original'], // ['original', 'compressed'], /
      sourceType: ['camera'], // ['album', 'camera'], 
      success: (res) => {

        upFile.up({

          filePath: res.tempFilePaths[0],
          data: {
            latitude: latitude,
            longitude: longitude,
            selArr: JSON.stringify(selArr),
            test: '/sss',
            MAX_FILE_SIZE: 'ab1'
          }
        }, () => { // 成功返回执行

        });
      }
    })
  },

  noGPS: function () {
    wx.showModal({
      title: '提示',
      content: '获取GPS位置失败',
      showCancel: false,

      success: function (res) {
        // 推出程序

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (res) => {
        latitude = res.latitude
        longitude = res.longitude

        gpsOK = true;

        this.setData({
          keyName: '拍照',
          loading: false,
        })
      },
      fail: (res) => {
        this.noGPS();
      },
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