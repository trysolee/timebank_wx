// pages/pic_show/pic_show.js


function theScale() {

  this.curBI = 1; // 当前的比例
  this.lastBI = 1;  // 

  this.Ox = 0; // 图片原始大小 x 
  this.Oy = 0;
  this.mixBI = 0;
  this.maxBI = 0;
  this.setO = function (x, y) {
    this.Cx = this.Ox = x;
    this.Cy = this.Oy = y;

    this.mixBI = 300 / x;
    this.maxBI = 1.2;
  }

  this.big = 0.35;
  this.small = 0.5;

  this.Cx = 0; // 图片当前大小 x
  this.Cy = 0;

  this.Mx = 0; // 手势,两指的中点 (距离显示窗的左上角)
  this.My = 0;
  this.setMidPoint = function (p1, p2) {
    this.Mx = (p1.clientX + p2.clientX) / 2 - 50;
    this.My = (p1.clientY - p2.clientY) / 2 + 10;
  };

  this.Mx_b = 0; // 中心点的百分比
  this.My_b = 0;
  this.setMb = function () {
    var x = this.left + this.Mx;
    var y = this.top + this.My;

    this.Mx_b = x / this.Cx;
    this.My_b = y / this.Cy;

  }


  this.theDist = function (p1, p2) {
    var xD, yD;
    xD = p1.clientX - p2.clientX;
    yD = p1.clientY - p2.clientY;
    return Math.sqrt(xD * xD + yD * yD);
  }

  this.dist_B = -1; // 一开始两指的距离

  this.dist1 = function (p1, p2) {
    this.dist_B = this.theDist(p1, p2);

    this.setMidPoint(p1, p2);

    this.setTL(); // 计算 左上角的偏移量

    this.setMb(); // 计算 关注点的 位置比例
  }

  this.dist2 = function (p1, p2) { // 后续计算 
    var d = this.theDist(p1, p2) - this.dist_B;
    var bi = this.small;
    if (d > 0)
      bi = this.big;

    // lastBI = d / dist * curBI ;
    this.lastBI = d * bi / this.dist_B + this.curBI;


    console.log(this.lastBI + '_' + this.curBI);


    if (this.lastBI > this.maxBI)
      this.lastBI = this.maxBI;

    if (this.lastBI < this.mixBI)
      this.lastBI = this.mixBI;

    this.Cx = parseInt(this.Ox * this.lastBI);
    this.Cy = parseInt(this.Oy * this.lastBI);

    this.retTL();

  }

  this.isRuning = function () {
    return this.dist_B > 0;
  }

  this.curTL = null;
  this.top = 0; // 左上角的偏移量
  this.left = 0;
  this.markTL = function (c) {
    this.curTL = c;
  }
  this.setTL = function () {
    this.top = this.curTL.scrollTop;
    this.left = this.curTL.scrollLeft;


  }

  this.topR = 0; // 返回的左上角偏移量
  this.leftR = 0;
  this.retTL = function () {
    this.topR = this.My_b * this.Cy - this.My;
    this.leftR = this.Mx_b * this.Cx - this.Mx;
  }

  this.end = function () {
    this.dist_B = -1;
    this.curBI = this.lastBI;
  }
}

var scale = new theScale();

var dist = -1, mixBI = 1;
var curBI = 1, lastBI = 1; // 当前比例 , 最后的比例
var Owidth = 0, Oheight = 0;
var curXY, midPoint;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // picURL: 'pic.png',
    // picURL: 'DJI.JPG',
    picURL: 'http://tryso.gz01.bdysite.com/upload/abc.JPG',
    // picURL: 'http://tryso.gz01.bdysite.com/upload/pic.png',

    scroll_ok: 'false'
  },

  imageLoad: function (e) {
    Owidth = e.detail.width;
    Oheight = e.detail.height;

    scale.setO(Owidth, Oheight);

    this.setData({
      _width: Owidth,
      _height: Oheight
    })
  },

  imageErr: function (e) {
  },

  scroll: function (e) {
    if (scale.isRuning()) // 正在缩放
      return;

    scale.markTL(e.detail);


    // if (dist < 0)
    //   curXY = e.detail;



    this.setData({
      _top: scale.top,
      _left: scale.left
    })
  },



  touchtap: function (e) {

    // TODO
    // 返回上一页

  },


  touchstart: function (e) {
    var t = e.touches;
    if (t.length != 2) // 不是两个手指 , 立即返回
      return;

    scale.dist1(t[0], t[1]);
  },

  touchmove: function (e) {

    var t = e.touches;
    if (t.length != 2) // 不是两个手指 , 立即返回
      return;

    scale.dist2(t[0], t[1]);

    this.setData({
      _width: scale.Cx,
      _height: scale.Cy,
      _scrollTop: scale.topR,
      _scrollLeft: scale.leftR
    })

    /*
    
        if (dist < 0) {
          dist = theDist(t[0], t[1]);
          midPoint = theMidPoint(t[0], t[1]);
    
        } else {
          var d = theDist(t[0], t[1]) - dist;
          var bi = 0.6;
          if (d > 0)
            bi = 0.3;
    
          var xx = d * bi / dist;
          var scrollTop = parseInt((curXY.scrollTop + midPoint.y) * (1 + xx) - midPoint.y);
          var scrollLeft = parseInt((curXY.scrollLeft + midPoint.x) * (1 + xx) - midPoint.x);
    
          curXY.scrollTop = scrollTop;
          curXY.scrollLeft = scrollLeft;
    
    
          // lastBI = d / dist * curBI ;
          lastBI = xx + curBI;
    
          if (lastBI > 1.2)
            lastBI = 1.2;
    
          if (lastBI < mixBI)
            lastBI = mixBI;
    
          this.setData({
            _width: parseInt(Owidth * lastBI),
            _height: parseInt(Oheight * lastBI),
            _scrollTop: scrollTop,
            _scrollLeft: scrollLeft
          })
        }
    
        */
  },
  touchend: function () {
    scale.end();
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