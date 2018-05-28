const PAGE = require('../../class/page');
const BUF = require('../../class/buf');
const PRO = require('../../class/project');
// 
var theList = [];
// 
function setList() {
    // var o = BUF.getOne('pro_all_user', PAGE.get('UID')).role;
    var o = PAGE.get('JSON').role;
    var l = theList = [{
        // primary
        // default
        // warn
        type: 'default',
        na: PAGE.get('userName'),
    }];
    var a = PRO.项目权限[PAGE.get('分组')];
    for (var i = 0; i < a.length; i++) {
        var x = a[i];
        var t = 'default';
        var n = x;
        //
        if (o.indexOf(x) >= 0) {
            t = 'primary';
            n = n + ' Y';
        }
        l.push({
            type: t,
            na: n,
            role: x,
            fun: '点击',
        });
    }
    return l;
}

function setBUF() {
    var o = PAGE.get('JSON');
    var a = theList;
    var l = [];
    // 
    for (var i = 1; i < a.length; i++) {
        if (a[i].type == 'primary') {
            l.push(a[i].role)
        }
    }
    o.role = l;
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: theList
    },
    点击: function(r) {
        var i = r.target.id;
        if (i > 0) {
            var o = theList[i];
            if (o.type == 'primary') {
                o.type = 'default'
            } else {
                o.type = 'primary'
            }
            this.setData({
                list: theList
            })
        }
    },
    onReady: function() {
        this.setData({
            list: setList()
        })
    },

    // 
    onUnload: function() {
        setBUF();
    },
})