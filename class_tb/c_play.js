// 
var _SYS = require('../class/sys');
var _ST = require('../class/showtxt');
const list = [];
// 
var playing = false;
// 
const PLAY = {
    // 
    play: function(url) {
        if (_SYS.非正式测试) {
            // 
            _ST.show('播放 : ' + url);
        }
    },
    //
};
module.exports = PLAY;