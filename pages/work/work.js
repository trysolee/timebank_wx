// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


    keyName: 'GPS...',

    loading: true,

    listDate: [{
      id: 1,
      na: '转到其他项目',
      t: 'noSel'
    }, {
      id: 2,
      na: '发出邀请',
      t: 'noSel'
    }, {
      id: 3,
      na: '新帖子',
      t: 'noSel'
    }, {
      id: 4,
      na: '地图',
      t: 'noSel'
    }],


    list: [{
      bg: 1,
      id: 1,
      pic: '红小鸟.jpg',
      na: '小鸟的翅膀变成红色'
    }, {
      bg: 2,
      id: 2,
      pic: '黄小鸟.jpg',
      na: '小鸟的'
    }, {
      bg: 1,
      id: 2,
      pic: '黄小鸟.jpg',
      na: '飞上天,整理'
    }]


  },


  tapName: function (a) {
    wx.showToast({
      title: a.currentTarget.id,
      icon: 'success',
      duration: 2000
    })

  },

  回复: function () {
    wx.showActionSheet({
      itemList: ['补充图片', '处理完成', '提问'],
      success: function (res) {
        wx.showToast({
          title: '' + res.tapIndex,
        })

      },
      fail: function (res) {
        wx.showToast({
          title: '' + res.errMsg,
        })
      }
    })

  },

  更多: function () {
    wx.showActionSheet({

      // 屏蔽帖子 , 需要管理员权限
      // 关闭回复 , 需要管理员权限 或 帖子作者
      itemList: ['地图', '关闭回复', '屏蔽帖子'],
      success: function (res) {
        wx.showToast({
          title: '' + res.tapIndex,
        })

      },
      fail: function (res) {
        wx.showToast({
          title: '' + res.errMsg,
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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