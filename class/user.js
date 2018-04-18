var user = function() {

  // 0 : 未定义 
  // 1 : 监理员
  // 4 : 监理_工程师
  // 9 : 监理_网管
  // 21 : 甲方
  // 23 : 甲方_主管
  // 29 : 甲方_网管
  // 31 : 施工员
  // 39 : 施工_网管

  // 120  : 管理员
  //
  this.role = 0;

  // 有<巡查拍照>的权限
  this.roleExpPIC = function () {

  }

  // 有<日常拍照>的权限
  this.roleWorkPIC = function () {

  }
};

module.exports = user;