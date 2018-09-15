// 
const A = getApp();
//
// 
const Page = {
    声音测试: {
        url: '../list_chk/list_chk',
        返回: '首页', // 
        datList: function() {
            var li = [{
                // primary
                // default
                // warn
                type: 'primary',
                na: '录音...',
                fun: '录音',
            }, {
                // primary
                // default
                // warn
                type: 'warn',
                na: '结束',
                fun: '结束',
            }, {
                // primary
                // default
                // warn
                type: 'primary',
                na: '回播',
                fun: '回播',
            }, {
                // primary
                // default
                // warn
                type: 'default',
                na: '播放web',
                fun: '播放',
            }, {
                // primary
                // default
                // warn
                type: 'default',
                na: '播放1',
                fun: '播放1',
            }, {
                // primary
                // default
                // warn
                type: 'default',
                na: 'stop',
                fun: 'stop',
            }];
            // TODO 
            // 只设置了<更多>键 , 
            // 帖子的列表还没有考虑
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        录音: function(dList, o) {
            A.REC.开始();
        },
        结束: function(dList, o) {
            A.REC.结束((res) => {
                console.log('recorder stop', res)
                PAGE.set('tempFilePath', res.tempFilePath)
            });
        },
        回播: function(dList, o) {
            A.A_PLAY.开始(PAGE.get('tempFilePath'));
        },
        播放: function(dList, o) {
            A.A_PLAY.开始('https://kfqlh.com/a3.mp3');
        },
        播放1: function(dList, o) {
            A.A_PLAY.开始('https://kfqlh.com/a1.m4a');
        },
        stop: function(dList, o) {
            A.A_PLAY.结束();
        },
    },
    首页: {
        url: '../list_chk/list_chk',
        标志: '首页',
        返回: null, // 没有返回键
        datList: function() {
            var li = [];
            var arr = A.USER.孩子列表();
            for (var i = 0; i < arr.length; i++) {
                var x = arr[i];
                li.push({
                    type: 'primary',
                    na: x.名称_存款(),
                    pageJump: '任务列表',
                    UID: x.UID(),
                    _page_set_: ['UID'],
                })
            }
            li.push({
                // primary
                // default
                // warn
                type: 'default',
                na: '系统',
                pageJump: '进入更多_密码',
                // fun: '更多',
            })
            return li;
        },
        // 
        // dList : 全部列表Arr
        // o : 被点击的obj
        // m : 被点击的 <下拉菜单>的obj
        点击: function(dList, o, m) {
            PAGE.pageObj().setData({
                ready: false,
                BKeyTxt: '请稍后...',
            });
            A.LOG({
                _URL: '变更项目_分组',
            });
        },
    },
    // 
    进入更多_密码: {
        url: '../fix_str/fix_str',
        OK_name: '确定',
        OK_page: '系统',
        msg: '提示：\n童锁默认:123，\n管理员可修改童锁。',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '短密',
        类型: '数字',
        密码: true,
        // 长度: 3,
        getStr: function() {
            return '输入童锁...';
        },
        OK_fun: function(str) {
            return A.My.密码OK(str);
        },
    },
    系统: {
        url: '../list_chk/list_chk',
        返回: '首页',
        // 载入数据url: '更新孩子数据',
        datList: function() {
            // 用于 列表的list
            // 
            var li = [
                // primary
                // default
                // warn
            ];
            // 
            // li.push({
            //     na: '排行榜',
            //     pageJump: '排行榜',
            //     // fun: '点击',
            // });
            li.push({
                na: '家人列表',
                pageJump: '人员列表',
                // fun: '点击',
            });
            // li.push({
            //     na: '好友邀请码...',
            //     _URL: '获取好友邀请码',
            // });
            li.push({
                na: '家长邀请码...',
                // _URL: '二维码B',
                // fun: '添加家长',
                _URL: '获取家长邀请码',
            });
            // li.push({
            //     na: '添加好友',
            //     pageJump: '添加好友',
            // });
            li.push({
                na: '添加孩子',
                pageJump: '添加孩子',
            });
            // 
            if (A.SYS.非正式测试) {
                li.push({
                    na: '-测试-',
                    pageJump: '测试1',
                });
            }
            // 
            return li;
        },
    },
    // 
    // 点击 '孩子' 后 
    // 更新数据
    // 再决定跳转到那一页
    任务列表: {
        url: '../list_chk/list_chk',
        返回: '上一页',
        // 载入数据url: '更新孩子数据',
        datList: function() {
            // 用于 列表的list
            // 
            var 执行包 = A.DAT.get_当前执行包();
            if (A.SYS.isObject(执行包)) {
                PAGE.set('m_box', 执行包);
                if (执行包.类型 == '任务') {
                    PAGE.open('执行任务');
                }
                if (执行包.类型 == '提款') {
                    PAGE.open('提款');
                }
                return '无用页';
            }
            // 
            var li = [
                // primary
                // default
                // warn
            ];
            // 
            var da = new Date();
            var 最近期的任务 = -1;
            var arr = A.MISSION.任务列表();
            for (var i in arr) {
                var x = arr[i];
                var n = x.名称() + ' [' //
                    + A.SYS.秒ToStr(x.时长()) // 
                    + ']';
                // 
                if (x.名称() == '临时') {
                    n = '临时任务 [自定义]'
                }
                // 
                if (最近期的任务 < 0) {
                    if (x.未到时间段()) 最近期的任务 = i;
                }
                li.push({
                    type: 'default',
                    na: n,
                    // _URL: '执行任务', // TODO 
                    fun: '执行任务',
                    任务Na: x.名称(),
                    _page_set_: ['任务Na'],
                })
            }
            //
            // 计算绿色键
            // 
            if (最近期的任务 < 0) 最近期的任务 = 0;
            li[最近期的任务].type = 'primary';
            if (最近期的任务 > 0) {
                li[最近期的任务 - 1].type = 'primary';
            }
            // 
            li.push({
                type: 'warn',
                na: '提款',
                // _URL: '执行任务', // TODO 
                // fun: '执行任务',
                // pageJump: '测试1',
                pageJump: '提款列表',
            })
            return li;
        },
        执行任务: function() {
            var na = PAGE.get('任务Na');
            if (na == '临时') {
                PAGE.open('执行临时任务');
                return;
            }
            // 
            var m = A.MISSION.getByNa(na);
            var b = m.创建_执行包();
            // 
            PAGE.set('m_box', b);
            A.PAGE.open('执行任务');
            // A.Url.setPageBack('执行任务');
            // A.Url.post('更新执行包');
            // 
            return null;
        },
    },
    // 
    执行临时任务: {
        url: '../fix_str/fix_str',
        // back_标志: '首页',
        OK_name: '确定',
        OK_URL: '任务结束',
        msg: '提示：\n临时任务时长在 5 ~ 60 分钟间。',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '时长',
        类型: '数字',
        // 长度: 3,
        getStr: function() {
            return '输入时长...( 分钟 )';
        },
        OK_fun: function(str) {
            var l = Number(str);
            if (!l) return;
            if (l < 5) return;
            if (l > 60) return;
            // 
            var e = A.ELEMENT.getByNa('临时x');
            e.BUF.时长 = l * 60;
            e.save();
            // 
            var m = A.MISSION.getByNa(PAGE.get('任务Na'));
            m.BUF.DAT.时长 = l * 60;
            m.save();
            // 
            var b = m.创建_执行包();
            // 
            PAGE.set('m_box', b);
            A.PAGE.open('执行任务');
            return false;
        },
    },
    // 
    提款列表: {
        url: '../list_chk/list_chk',
        返回: '首页',
        // 载入数据url: '更新孩子数据',
        datList: function() {
            // 用于 列表的list
            // 
            var user = A.USER.getByID(PAGE.get('UID'));
            var 存款 = user.存款();
            // 
            var li = [
                // primary
                // default
                // warn
            ];
            //           
            var arr = A.TAKEBACK.任务列表();
            for (var i in arr) {
                var x = arr[i];
                var t = 'default';
                if (x.预留存款() < 存款) {
                    t = 'primary';
                }
                li.push({
                    type: t,
                    na: x.列表名称(),
                    // _URL: '执行任务', // TODO 
                    fun: '执行任务',
                    任务Na: x.名称(),
                    _page_set_: ['任务Na'],
                })
            }
            return li;
        },
        执行任务: function() {
            // 
            var m = A.TAKEBACK.getByNa(PAGE.get('任务Na'));
            var user = A.USER.getByID(PAGE.get('UID'));
            if (user.存款() < m.预留存款()) {
                A.ST.show('存款不足 : ' + A.SYS.秒ToStr(m.预留存款()));
                return null;
            }
            var b = m.创建_执行包();
            // user.set执行包(b);
            // 
            PAGE.set('m_box', b);
            PAGE.open('提款');
            // A.Url.setPageBack('提款');
            // A.Url.post('更新执行包');
            // 
            return null;
        },
    },
    执行任务: {
        url: '../run_time1/run_time1',
        返回: '首页',
    },
    提款: {
        url: '../get_time/get_time',
        返回: '首页',
    },
    // 
    结束任务_密码: {
        url: '../fix_str/fix_str',
        back_标志: '首页',
        OK_name: '确定',
        OK_URL: '任务结束',
        msg_fun: function() {
            var s = '提示：\n童锁默认:123，\n管理员可修改童锁。';
            s += '\n\n小计 :' + A.SYS.秒ToStr(A.PAGE.get('剩下时间'));
            return s;
        },
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '短密',
        类型: '数字',
        密码: true,
        // 长度: 3,
        getStr: function() {
            return '输入童锁...';
        },
        OK_fun: function(str) {
            return A.My.密码OK(str);
        },
    },
    // 
    取消任务_密码: {
        url: '../fix_str/fix_str',
        back_标志: '首页',
        OK_name: '取消任务',
        // OK_URL: '任务结束',
        msg_fun: function() {
            var s = '提示：\n童锁默认:123，\n管理员可修改童锁。';
            return s;
        },
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '短密',
        类型: '数字',
        密码: true,
        // 长度: 3,
        getStr: function() {
            return '输入童锁...';
        },
        OK_fun: function(str) {
            if (A.My.密码OK(str)) {
                A.DAT.set_当前执行包('');
                return true;
            }
            return false;
        },
    },
    // 
    家长邀请码: {
        url: '../fix_str/fix_str',
        返回: '首页',
        back_标志: '首页',
        OK_name: '确定',
        msg: '提示：\n已获取家长邀请码\n请在注册时选择[加入家庭]。',
        // 
        // 输入后 , 用'h_name'保存在page
        // pageVN: '短密',
        类型: '数字',
        密码: true,
        // 长度: 3,
        getStr: function() {
            return A.PAGE.get('家长邀请码');
        },
        // OK_fun: function(str) {
        //     return A.My.密码OK(str);
        // },
    },
    // 
    好友邀请码: {
        url: '../fix_str/fix_str',
        返回: '首页',
        back_标志: '首页',
        OK_name: '确定',
        msg: '提示：\n已获取好友邀请码\n请发给你的好友。',
        // 
        // 输入后 , 用'h_name'保存在page
        // pageVN: '短密',
        类型: '数字',
        密码: true,
        // 长度: 3,
        getStr: function() {
            return A.PAGE.get('好友邀请码');
        },
        // OK_fun: function(str) {
        //     return A.My.密码OK(str);
        // },
    },
    // 
    结束提款_密码: {
        url: '../fix_str/fix_str',
        back_标志: '首页',
        OK_name: '确定',
        OK_URL: '提款结束',
        msg: '提示：\n童锁默认:123，\n管理员可修改童锁。',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '短密',
        类型: '数字',
        密码: true,
        // 长度: 3,
        getStr: function() {
            return '输入童锁...';
        },
        OK_fun: function(str) {
            return A.My.密码OK(str);
        },
    },
    人员列表: {
        url: '../list_chk/list_chk',
        返回: '上一页',
        datList: function() {
            var arr = A.USER.家长_孩子_好友列表();
            var li = [];
            // 
            // primary
            // default
            // warn
            for (var i = 0; i < arr.length; i++) {
                var x = arr[i];
                var t = 'default';
                var f = null;
                // 
                if (x.is孩子()) {
                    t = 'primary';
                    f = '_孩子';
                }
                if (x.is好友()) {
                    t = 'primary';
                    f = '_好友';
                }
                if (x.is家长()) {
                    t = 'default';
                    f = '_家长';
                }
                li.push({
                    type: t,
                    na: x.名称_存款(),
                    user: x,
                    UID: x.UID(),
                    _page_set_: ['UID'],
                    fun: f,
                })
            }
            return li;
        },
        // 
        _家长: function(dList, o) {
            // 
            var an = '设为管理员';
            var x = o.user;
            if (x.is管理员()) {
                an = '撤销管理员';
            }
            // 
            var li = [{
                na: '改称为',
                pageJump: '家长_改名',
            }, {
                na: '改童锁',
                pageJump: '家长_改密码',
            }, {
                na: an,
                _URL: '管理员_转换',
            }, {
                na: '删除',
                _URL: '删除家长',
            }];
            // 
            return li;
        },
        // 
        _孩子: function(dList, o) {
            var x = o.user;
            x.刷新();
            // 
            var li = [{
                na: '改昵称',
                pageJump: '孩子_改名',
            }, {
                na: '删除',
                _URL: '删除孩子',
            }];
            if (x.is提款中()) {
                li.unshift({
                    na: '取消提款',
                    fun: '删除执行包',
                    // _URL: '提款取消',
                })
            } else if (x.is任务中()) {
                li.unshift({
                    na: '取消任务',
                    fun: '删除执行包',
                    // _URL: '任务取消',
                })
            }
            // 
            return li;
        },
        // 
        _好友: function(dList, o) {
            // 
            var li = [{
                na: '删除',
                _URL: '删除好友',
            }];
            // 
            return li;
        },
        // 
        删除执行包: function(dList, o, c) {
            // abc
            A.DAT.set_当前执行包('');
        },
    },
    家长_改密码: {
        url: '../fix_str/fix_str',
        OK_URL: '家长_改密码',
        OK_name: '修改',
        // msg: '提示：\n还可以通过 [ 扫一扫 ] 分享码，\n加入已有家庭。',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '短密',
        类型: '数字',
        长度: 3,
        getStr: function() {
            return '输入新童锁...(3位数字)';
        },
        // OK_fun: function(str) {},
    },
    家长_改名: {
        url: '../fix_str/fix_str',
        OK_URL: '家长_改名',
        OK_name: '修改',
        // msg: '提示：\n还可以通过 [ 扫一扫 ] 分享码，\n加入已有家庭。',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '家长称为',
        getStr: function() {
            return '输入家长称为...';
        },
        // OK_fun: function(str) {},
    },
    孩子_改名: {
        url: '../fix_str/fix_str',
        OK_URL: '孩子_改名',
        OK_name: '修改',
        // msg: '提示：\n还可以通过 [ 扫一扫 ] 分享码，\n加入已有家庭。',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '孩子昵称',
        getStr: function() {
            return '输入孩子昵称...';
        },
        // OK_fun: function(str) {},
    },
    注册: {
        url: '../list_chk/list_chk',
        标志: '首页',
        // 载入数据url: '更新孩子数据',
        datList: function() {
            // 用于 列表的list
            // 
            var li = [
                // primary
                // default
                // warn
            ];
            // 
            // li.push({
            //     na: '排行榜',
            //     pageJump: '排行榜',
            //     // fun: '点击',
            // });
            li.push({
                na: '注册',
                // pageJump: '人员列表',
                // fun: '点击',
            });
            li.push({
                na: '创建家庭',
                type: 'primary',
                pageJump: '注册_孩子昵称',
            });
            li.push({
                na: '或者',
                // _URL: '二维码B',
                // fun: '添加家长',
                // _URL: '获取家长邀请码',
            });
            li.push({
                na: '加入家庭',
                type: 'primary',
                pageJump: '注册_加入家庭1',
            });
            // 
            return li;
        },
    },
    注册_加入家庭1: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_page: '注册_加入家庭2',
        OK_name: '下一步',
        msg: '提示：\n可以通过[ 家长邀请码... ]获得邀请码。',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '家长邀请码',
        getStr: function() {
            return '家长邀请码';
        },
        // OK_fun: function(str) {},
    },
    注册_加入家庭2: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_URL: '加入家庭',
        OK_name: '确定加入家庭',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: '家长称为',
        getStr: function() {
            return '称为(爸爸,妈妈...)';
        },
        // OK_fun: function(str) {},
    },
    // ------------------
    注册_孩子昵称: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_page: '注册_家长称为',
        OK_name: '下一步',
        msg: '提示：\n注册完成后,可以再添加第二个孩子。',
        // 
        // 输入后 , 用'h_name'保存在page
        pageVN: 'h_name',
        getStr: function() {
            return '孩子昵称';
        },
        // OK_fun: function(str) {},
    },
    注册_家长称为: {
        url: '../fix_str/fix_str',
        返回: '上一页',
        OK_URL: '创建家庭',
        OK_name: '注册',
        msg: '提示：\n你是第一个家长,也是管理员。',
        // 
        // back_标志: '首页',
        // 
        // 输入后 , 用'j_name'保存在page
        pageVN: 'j_name',
        getStr: function() {
            return '称为(爸爸,妈妈...)';
        },
        OK_fun: function(str) {
            A.PAGE.set('LJ', '4');
            return true;
        },
    },
    测试1: {
        url: '../fix_str/fix_str',
        // 返回: '上一页',
        OK_name: '输入测试码',
        // 
        // 输入后 , 用'input_name'保存在page
        pageVN: 'input_name',
        getStr: function() {
            return '声音测试';
        },
        OK_fun: function(str) {
            if (str == '重载数据') {
                var 测试_执行包 = A.FIRST.测试1();
                // 
            } else if (str == 'p') {
                A.FIRST.测试2(测试_执行包);
                // 
            } else if (str == 's') {
                A.FIRST.测试3();
                //     // 
            } else if (str == '声音测试') { // 声音测试
                // var p = A.PAGE.当前page();
                this.OK_page = '声音测试';
                // 
            } else if (str == '网络引用') {
                var str = JSON.stringify(A.CS);
            }
            // 
            return true;
        },
        msg: '重载数据\n声音测试\n网络引用'
    },
    // 
    // TODO
    // 注册 孩子几年级
    // 
    // 
    添加好友: {
        url: '../fix_str/fix_str',
        返回: '首页',
        back_标志: '首页',
        OK_URL: '添加好友',
        OK_name: '添加好友',
        // 
        // 输入后 , 用'input_name'保存在page
        pageVN: '好友邀请码',
        getStr: function() {
            return '好友邀请码';
        },
        // OK_fun: function(str) {},
    },
    添加孩子: {
        url: '../fix_str/fix_str',
        返回: '首页',
        OK_URL: '添加孩子',
        OK_name: '添加孩子',
        // 
        // 输入后 , 用'input_name'保存在page
        pageVN: 'input_name',
        getStr: function() {
            return '孩子昵称';
        },
        // OK_fun: function(str) {},
    },
    添加家长: {
        url: '../fix_str/fix_str',
        返回: '首页',
        OK_URL: '添加家长',
        OK_name: '添加家长',
        // 
        // 输入后 , 用'input_name'保存在page
        pageVN: 'input_name',
        getStr: function() {
            return '称为(爷爷,奶奶...)';
        },
        OK_fun: function(str) {
            A.PAGE.set('JID', A.MY.家庭id);
            return true;
        },
    },
    // 
    设置系统管理员: {
        LOAD_URL: '系统管理员列表',
        OK_URL: '系统管理员设置',
        OK_name: '设定系统管理员',
        url: '../list_sel/list_sel',
        // cla: 'list_sel',
        返回: '上一页',
        datList() {
            var UIDs = [];
            var admin = A.BUF.getBUF('sys_admin');
            var l = [];
            for (var i in admin) {
                l.push({
                    // primary
                    // default
                    // warn
                    type: 'primary',
                    na: admin[i].name,
                    name: admin[i].UID,
                    chk: true,
                });
                UIDs.push(admin[i].UID);
            }
            // 
            var user = A.BUF.getBUF('user');
            for (var i in user) {
                if (UIDs.indexOf(user[i].UID) < 0) //
                    l.push({
                        type: 'default',
                        na: user[i].name,
                        name: user[i].UID,
                        chk: true,
                    })
            }
            return l;
        },
        // 
        // arr : ['管理员','施工巡查']
        // list : [{type:'primary',na:'管理员'},{...}]
        OK_fun: function(arr, list) {
            PAGE.set('ARR', arr);
        },
    },
    项目人员: {
        // cla: 'list_chk',
        url: '../list_chk/list_chk',
        返回: '上一页',
        载入数据url: '获取项目的全部人员',
        OK_URL: '修改分组人员权限',
        OK_name: '确定',
        OK_fun: function(dList) {
            var a = dList;
            var obj = {};
            for (var i in a) {
                var x = a[i];
                if (x.fun == 'menuList') //
                    obj[x.UID] = x.JSON.role;
            }
            PAGE.set('ARR', obj);
        },
        datList: function() {
            // 用于 列表的list
            var li = [{
                // primary
                // default
                // warn
                type: 'default',
                na: PAGE.get('项目名') + ' . ' + PAGE.get('分组名'),
            }];
            // 
            var a = BUF.getBUF('pro_all_user');
            for (var i in a) {
                var x = a[i];
                var n = x.JSON.name;
                var r = x.JSON.role;
                // 
                // 如果有权限( 没有被删除 )
                var t = 'primary'; // or 'warn'
                if (r.lenght < 1) {
                    t = 'warn';
                    n = '[ 删 ] ' + n;
                } else if (r.indexOf('管理员') != -1) {
                    n = n + ' [ 管 ]';
                }
                // 
                li.push({
                    type: t,
                    na: n,
                    name: x.JSON.name,
                    UID: x.UID,
                    JSON: x.JSON,
                    fun: 'menuList',
                })
            }
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        menuList: function(dList, o) {
            //  用于 下拉菜单的list
            var li = [];
            // 
            li.push({
                na: o.name,
                UID: o.UID,
                userName: o.name,
                JSON: o.JSON,
                fun: '点击',
            });
            return li;
        },
        // dList : 全部列表Arr
        // o : 被点击的obj
        // m : 被点击的 <下拉菜单>的obj
        点击: function(dList, o, m) {
            PAGE.set('UID', m.UID);
            PAGE.set('userName', m.userName);
            PAGE.set('JSON', m.JSON);
            PAGE.open('人员权限');
        },
        单一直接执行: true,
    },
};
// 
// 由于 <打开页面> 需要等待 <onReady>异步处理
// 所以需要把 <当前page> 临时记录在<backup>里面
var backup = Page['首页'];
// 
const PAGE = {
    open: function(p) {
        // 
        A.ST.reSet();
        // 
        var o = backup = Page[p];
        //
        if (o.标志 == '首页') {
            var p = getCurrentPages();
            for (var i = p.length - 1; i >= 0; i--) {
                var cp = p[i];
                cp.data.重开首页 = true;
            }
            // 
            wx.reLaunch({
                url: o.url,
            })
        } else {
            wx.navigateTo({
                url: o.url,
            })
        }
    },
    // 
    pageBack: function() {
        var cp = this.pageObj();
        if (cp.data.重开首页) {
            return;
        }
        wx.navigateBack();
    },
    // 
    pageBackTo: function(标志) {
        var b = 0;
        var p = getCurrentPages();
        // i 从倒数第二page 开始 , 到 顺数第二page结束
        for (var i = p.length - 1; i >= 1; i--) {
            var cp = p[i];
            if (cp.data.重开首页) {
                return;
            }
            //
            // 如果遇到<ready : false > (没有准备好)
            // 的page
            // 也不要他
            if (!cp.data.ready) {
                wx.navigateBack();
                continue;
            }
            if (cp._BOX_.page.标志 == 标志) return;
            // 
            cp.data.ready = false;
            b++;
        }
        if (b > 0) wx.navigateBack({
            delta: b
        });
    },
    // 
    // 
    // 有可能一次返回多个page ,
    // 导致每个页面都触发<onunload>
    // 为了避免这种情况,
    // 每返回一个page , 就把他的<data.ready>设为false
    // 
    pageBack_标志: function(page_obj) {
        var b = 0;
        
        // 有重开<首页>标记 
        if (page_obj.data.重开首页) {
            return;
        }
        // 
        if (!page_obj.data.ready) {
            return;
        }
        // 
        var o = this.当前page();
        if (o.返回 == '上一页') {
            return;
        } else if (!o.返回) {
            return;
        } else {
            var p = getCurrentPages();
            // i 从倒数第二page 开始 , 到 顺数第二page结束
            for (var i = p.length - 2; i >= 1; i--) {
                var cp = p[i];
                //
                // 如果遇到<ready : false > (没有准备好)
                // 的page
                // 也不要他
                if (!cp.data.ready) {
                    // wx.navigateBack();
                    b++;
                    continue;
                }
                if (cp._BOX_.page.标志 == o.返回) {
                    if (b > 0) wx.navigateBack({
                        delta: b
                    });
                    return;
                }
                // 
                cp.data.ready = false;
                // wx.navigateBack();
                b++;
            }
            if (b > 0) wx.navigateBack({
                delta: b
            });
        }
    },
    // 
    isDEL: function(page_obj) {
        return page_obj.data._DELed;
    },
    // 
    DEL: function(page_obj) {
        page_obj.data._DELed = true;
    },
    // 
    当前page: function() {
        var box = this.pageObj()._BOX_;
        // if (!box) box = this.pageObj()._BOX_ = {};
        return box.page;
    },
    // 
    pageObj: function() {
        var p = getCurrentPages();
        var l = p.length;
        return p[l - 1];
    },
    // 
    ready: function() {
        //  页面 ready 
        //  可以启动预设程序
        //  
        // var o = backup;
        var op = this.pageObj();
        var box = op._BOX_ = {
            page: backup,
            dat: {},
        };
    },
    //   
    // 设置 数值
    set: function(n, v) {
        // 
        var op = this.pageObj();
        if (op._BOX_) {
            op._BOX_.dat[n] = v;
        } else {
            var d = {};
            d[n] = v;
            op._BOX_ = {
                dat: d,
            };
        }
    },
    get: function(n) {
        // 
        var p = getCurrentPages();
        var l = p.length - 1;
        for (var i = l; i >= 0; i--) {
            if (!p[i]._BOX_) continue;
            var v = p[i]._BOX_.dat[n];
            if (typeof(v) != 'undefined') //
                return v;
        }
        return null;
    },
}
module.exports = PAGE;