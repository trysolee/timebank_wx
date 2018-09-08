// 
const A = getApp();
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = false;
innerAudioContext.volume = 1;
innerAudioContext.onEnded(() => {
    go();
})
innerAudioContext.onError((res) => {
    // A.ST.show('播放失败:' + lastURL);
})
// 
var list = [];
var lastURL = null;
// 
var playing = false;
const go = function() {
    if (list.length > 0) {
        lastURL = list.shift();
        innerAudioContext.src = lastURL;
        innerAudioContext.play();
    } else {
        playing = false;
    }
};
// 
const PLAY = {
    // 
    play: function(url) {
        if (A.SYS.不播放声音) {
            // 
            A.ST.show('播放 : ' + url);
            return;
        }
        // 
        list.push(url);
        if (playing) {
            return;
        } else {
            playing = true;
            go();
        }
    },
    //
    重置: function() {
        list = [];
        innerAudioContext.stop();
        playing = false;
        lastURL = null;
    },
    //
    重听: function() {
        if (lastURL) this.play(lastURL);
    },
    //
};
module.exports = PLAY;