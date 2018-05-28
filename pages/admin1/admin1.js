const PRO_USER = require('../../class/pro_user');
const PAGE = require('../../class/page');
const MY = require('../../class/user_my');
const LOG = require('../../class/log.js');

// 
var theList = [];
var theList2 = [];
// 
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    // 
    项目: function(r) {
        var index = r.target.id;
        var o = theList[index];
        // 
        if (MY.系统权限() // 
            && MY.is当前项目(o.JID)) {
            // 
            PAGE.set('JID', o.JID);
            PAGE.set('项目名', o.项目名);
            //
            theList2 = ['修改项目名称'];
            wx.showActionSheet({
                itemList: theList2,
                success: function(res) {
                    var i = res.tapIndex;
                    LOG({
                        _VAL: theList2[i],
                    })
                },
            })
        }
    },
    // 
    分组: function(r) {
        var index = r.target.id;
        var o = theList[index];
        PAGE.set('JID', o.JID);
        PAGE.set('分组', o.分组);
        PAGE.set('分组名', o.分组名);
        PAGE.set('项目名', o.项目名);
        // TODO
        // 
        // <分组管理员> 可以修改 分组名称
        // <分组管理员> 可以 修改分组权限
        // 可以进入<分组>
        // 
        theList2 = [];
        if (MY.is当前项目(o.JID) //
            && MY.is当前分组(o.分组) //
            && MY.分组权限(o.JID, o.分组)) {
            theList2.push('修改分组名称');
            theList2.push('修改分组权限');
        }
        theList2.push('进入分组');
        // 
        wx.showActionSheet({
            itemList: theList2,
            success: function(res) {
                var i = res.tapIndex;
                LOG({
                    _VAL: theList2[i],
                })
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        theList = PRO_USER.list();
        this.setData({
            list: theList
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})