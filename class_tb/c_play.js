// 
const A = getApp();
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = false;
innerAudioContext.onEnded(() => {
    go();
})
innerAudioContext.onError((res) => {
    A.ST.show('播放失败:' + lastURL);
})
// 
const list = [];
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
};
module.exports = PLAY;