const PAGE = require('../../class/page');
const Url = require('../../class/url.js');
// 
// 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        BKeyTxt: '载入...',
        ready: false,
        Loading: true, // 按键设置
        hasOK: false,
        keyType: 'default',
    },
    // 
    theList: null,
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        PAGE.ready();
        // 
        var o = PAGE.当前page();
        if (o.载入数据url) {
            Url.setPageBack('callBack');
            Url.post(o.载入数据url);
        } else {
            this.callBack();
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (this.data.ready) {
            this.callBack(true);
        }
    },
    // OK : true 返回成功
    callBack: function(OK) {
        var dat = {
            ready: true
        };
        var cp = PAGE.当前page();
        var li = dat.list = cp.datList();
        // 
        if (cp.OK_URL || cp.OK_fun) {
            dat.hasOK = true;
            dat.OK_name = '确定';
            if (cp.OK_name) dat.OK_name = cp.OK_name;
        }
        PAGE.set('theList', li);
        this.setData(dat);
    },
    OK_key: function() {
        var p = PAGE.当前page();
        var a = PAGE.get('theList');
        // 
        if (p.OK_fun) {
            p.OK_fun(a);
        }
        // 
        if (p.OK_URL) {
            Url.setPageBack('OK_end');
            Url.post(p.OK_URL);
            this.setData({
                ready: false,
                BKeyTxt: '请稍后...',
            })
        } else {
            this.OK_end(true);
        }
    },
    OK_end: function(OK) {
        if (OK) PAGE.pageBack()
    },
    //
    // 主要判断执行 <pageJump> 和 <fun>
    // <fun>比较复杂 :
    // 可以返回一个<下拉菜单>二次点击
    // 也可以直接操作,返回null 或者 []
    chk: function(r) {
        var index = r.target.id;
        var cp = PAGE.当前page();
        var p = PAGE.get('theList');
        var o = p[index];
        // 
        //  点击后 , 把指定的'数值' set到 PAGE里面
        if (o._page_set_)
            for (var x in o) //
                PAGE.set(x, o[x]);
        // 
        if (o.pageJump) {
            PAGE.open(o.pageJump);
            return;
        }
        if (!o.fun) return;
        // 
        var l = cp[o.fun](p, o);
        // 
        if (!l) {
            return;
        } else if (l.length == 0) {
            // 
            return;
        } else if (l.length == 1 && cp.单一直接执行) {
            // 
            cp.点击(p, o, l[0]);
        } else {
            PAGE.set('_MENU_LIST_', l);
            PAGE.set('_SEL_OBJ_', o);
            // 
            var li = [];
            for (var i = 0; i < l.length; i++) {
                li.push(l[i].na);
            }
            wx.showActionSheet({
                itemList: li,
                success: function(res) {
                    var i = res.tapIndex;
                    var p = PAGE.get('theList');
                    var o = PAGE.get('_SEL_OBJ_');
                    var c = PAGE.get('_MENU_LIST_')[i];
                    if (c.pageJump) {
                        PAGE.open(c.pageJump);
                        return;
                    }
                    if (c.fun) {
                        PAGE.当前page()[c.fun](p, o, c);
                        return;
                    }
                },
            })
        }
    },
})