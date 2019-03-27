//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    covercontent: '双休日及法定公休假日：\n9：00——17：00，接待个人和团体\n\n工作日：按沟通约定的时间，只接待团体，不接待个人',
    intro: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    guide_pic: {},
    top:0,
    audioContext: undefined,
    showModal: false
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    this.audioContext = wx.createInnerAudioContext();
    this.audioContext.onEnded((e) => {
      that.setData({
        playing: false,
        paused: false
      })
    })
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        showModal: false
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          showModal: false
        })
      }
      app.noAuthCallback = res => {
        this.setData({
          showModal: true
        })
      }
    }

    //请求页面数据
    wx.request({
      url: 'https://www.sysubiomuseum.com/search/mainintro',
      method: 'GET',
      success: res=>{
        for (var i = 0; i < res.data.guide_pic.length; i++) {
          res.data.guide_pic[i] = "https://www.sysubiomuseum.com/pic/exhibitionpic/" + res.data.guide_pic[i];
        }
        this.setData({
          intro: "&nbsp;&nbsp;"+res.data.simple_intro.replace("\r\n", "\r\n&nbsp;&nbsp;"),
          guide_pic: res.data.guide_pic
        }) 
      }
    })
  },

  onReady: function () {
  },

  pushdown:function(e){
    wx.pageScrollTo({
      scrollTop: this.data.windowHeight,
      duration: 1000,
    })
  },

  getAip: function (e) {
    var self = this
    console.log(e.currentTarget.dataset.filename, e.currentTarget.dataset.transfer_data, e.currentTarget.dataset.title)
    wx.request({
      url: 'https://www.sysubiomuseum.com/aip/getaip',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        type: 'museum',
        id: self.id,
        transfer_data: e.currentTarget.dataset.title + ',' + e.currentTarget.dataset.transfer_data.replace(/&nbsp/g, ' '),
        title: e.currentTarget.dataset.filename
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        self.closeAudio()
        self.setData({
          playing: true,
          paused: false,
          audioTitle: e.currentTarget.dataset.title,
        })
        wx.downloadFile({
          url: res.data.url,
          success(response) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              self.audioContext.src = response.tempFilePath
              self.audioContext.autoplay = true
              console.log(self.audioContext)
              self.audioContext.play()
            }
          }
        })
      }
    })
  },
  switchAudio() {
    if (!this.data.paused) {
      this.audioContext.pause()
    } else {
      this.audioContext.play()
    }
    this.setData({
      paused: !this.data.paused
    })

  },
  closeAudio() {
    this.audioContext.stop()
    this.setData({
      playing: false,
      paused: false
    })
  },
  preventTouchMove(e) {

  },
  laterLogin() {
    this.setData({
      showModal: false,
    })
    wx.showToast({
      title: '可以在 \"个人\" 进行登录哦~',
      icon: 'none'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      showModal: false
    })
    wx.setStorageSync("encrypteddata", e.detail.encryptedData)
    wx.setStorageSync("iv", e.detail.iv)
  }
})
