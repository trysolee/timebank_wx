var SYS = require('./sys');
var BUF = require('./buf');

const upfile = {
   URL: 'http://localhost/uploadfile.php', //
  // URL: 'http://192.168.31.199/uploadfile.php', //
  // URL: 'http://tryso.gz01.bdysite.com/uploadfile.php', //

  uploadTask: null,

  callBack: null,

  dat: {
    filePath: '//ddddd',
    data: {
      'test': '/sss',
      'MAX_FILE_SIZE': 'ab1'
    },
  },

  // 
  up: function (d, c) {

    if (d)
      this.dat = d;
    if (c)
      this.callBack = c;

    var a = this.dat;


    wx.showLoading({
      title: '上传中...',
      mask: true
    });

    this.uploadTask = wx.uploadFile({
      url: this.URL, //
      filePath: a.filePath,
      name: 'file',
      formData: a.data,
      success: (res) => { //  -- 成功     

        BUF.jsonIN(res.data);

        if (this.callBack)
          this.callBack();

        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1300
        })
      },

      fail: (res) => { //  -- 失败
        var data = res.data
        //do something

        wx.showToast({
          title: '上传失败',
          icon: 'fail',
          duration: 2000
        })
      },
      complete: (res) => { //  -- 完成
        wx.hideLoading();
      }
    });

    this.uploadTask.onProgressUpdate((res) => {

      var i = res.progress;
      var s = '上传中...' + i + '%'
      if (i >= 100)
        s = '接收返回数据...'

      wx.showLoading({
        title: s,
        mask: true
      })
    })
  }
};

module.exports = upfile;