const recorderManager = wx.getRecorderManager()
var tempFilePath = null;
// 
recorderManager.onStart(() => {
    console.log('recorder start')
})
recorderManager.onPause(() => {
    console.log('recorder pause')
})
recorderManager.onStop((res) => {
    console.log('recorder stop', res)
    tempFilePath = res.tempFilePath
})
recorderManager.onFrameRecorded((res) => {
    const {
        frameBuffer
    } = res
    console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})
const options = {
    duration: 3000,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    format: 'aac',
    frameSize: 50
}
const REC = {
    开始: function() {
        recorderManager.start(options)
    },
    FilePath: function() {
        return tempFilePath;
    },
    结束: function(fun) {
        recorderManager.onStop(fun);
        recorderManager.stop();
    }
}
module.exports = REC;