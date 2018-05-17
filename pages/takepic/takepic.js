// camera.js
Page({
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })

        wx.saveImageToPhotosAlbum({
          filePath: res.tempImagePath,
          success(res) {

          }
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})