 // 
 const A = getApp();
 // 
 var SHOW_CODE = function() {
     // 
     var d = {
         scene: A.PAGE.get('_SCENE_'),
         page: A.PAGE.get('_接受PAGE_'),
     }
     wx.request({
         // url: o.url,
         url: A.SYS.post_URL('二维码B'),
         data: d,
         success: function(res) {
             var a = res;
             // A.LOG({
             //     // 触发 <连接_成功> 或 <连接_成功_但有ERR>
             //     _VAL: '返回OK', // 服务器返回成功
             //     DAT: res.data,
             // });
         },
         fail: function(ret) {
             var a = ret;
             // A.LOG({
             //     _VAL: '连接_失败',
             // })
         },
         method: 'POST',
         header: {
             // 'content-type': 'application/x-www-form-urlencoded' // 默认值
             'content-type': 'application/json;charset=utf8'
         },
     })
 }
 module.exports = SHOW_CODE;