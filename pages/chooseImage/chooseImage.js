
var upCenter = {

  ARR: null,
  index: 0,
  callBack: null,

  upFiles: function (arr, cb) {
    this.ARR = arr;
    this.index = 0;

    this.ups();
  },

  ups: function () {
    if (this.index < this.ARR.length) {
      this.up1(this.ARR[this.index++]);
    } else {
      if (this.callBack)
        this.callBack();
    }
  },



  up1: function (fp) {
    wx.uploadFile({
      // url: 'http://localhost/uploadfile.php', //
      url: 'http://192.168.31.199/uploadfile.php', //
      // url: 'http://tryso.gz01.bdysite.com/uploadfile.php', //
      filePath: fp,
      name: 'file',
      formData: {
        'user': 'test',
        'MAX_FILE_SIZE': 'ab1'
      },
      success: function (res) {
        var data = res.data
        //do something

        upCenter.ups();
      }
    })

  },


}


var uploadTask ;

// pages/chooseImage/chooseImage.js
Page({

  index: 0,

  filelist() {
    wx.getSavedFileList({
      success: (res) => {
        var l = res.fileList;
        if (l.length <= 0)
          return

        var p = l[this.index].filePath
        this.setData({
          Path: p,
          src: p
        })

        this.index++
        if (this.index >= l.length)
          this.index = 0
        // console.log(res.fileList)

        wx.uploadFile({
          //  url: 'http://localhost/uploadfile.php', //
          // url: 'http://192.168.31.199/uploadfile.php', //
          url: 'http://tryso.gz01.bdysite.com/uploadfile.php', //
          filePath: p,
          name: 'file',
          formData: {
            'user': 'test',
            'MAX_FILE_SIZE': 'ab1'
          },
          success: function (res) {
            var data = res.data

            console.log(data)
          }
        })

      }
    })
  },

  delAll() {
    var that = this

    wx.getSavedFileList({
      success: function (res) {
        if (res.fileList.length > 0) {
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            success: function (res) {
              that.delAll()
            }
          })
        }
      }
    })
  },

  uploadTask: null,

  cameraUP() {
    wx.chooseImage({

      count: 1,

      sizeType: ['original', 'compressed'], // ['original', 'compressed'], /
      sourceType: ['camera'], // ['album', 'camera'], 
      success: (res) => {

        this.setData({
          text: '上传中.. 0'
        })

        uploadTask= wx.uploadFile({
          // url: 'http://localhost/uploadfile.php', //
          // url: 'http://192.168.31.199/uploadfile.php', //
           url: 'http://tryso.gz01.bdysite.com/uploadfile.php', //
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test',
            'MAX_FILE_SIZE': 'ab1'
          },
          success: (res) => {
            var data = res.data
            //do something

            this.setData({
              text: '上传完成'
            })
          }
        });

        uploadTask.onProgressUpdate((res) => {


          this.setData({
            text: '进度'+ res.progress
          })

        })

      }
    })
  },

  chooseImage() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths


        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: (res) => {
            var savedFilePath = res.savedFilePath

            this.setData({
              src: savedFilePath,
              Path: savedFilePath
            })
          }
        })
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

    src: '',
    text: '准备中'


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