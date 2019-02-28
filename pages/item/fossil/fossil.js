Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    currentTab: 0,
    exhibitImageHeight: 0,
    audioContext: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //跳转测试
    this.id = options.id;
    // var id = options.id;
    var that = this;
    this.audioContext = wx.createInnerAudioContext();
    this.audioContext.onEnded((e) => {
      that.setData({
        playing: false,
        paused: false
      })
    })

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenWidth: res.windowWidth,
        })
      },
    })

    wx.request({
      url: "https://www.sysubiomuseum.com/search/fossil",
      method: "GET",
      data: {
        specId: this.id,
        openid: wx.getStorageSync('encrypteddata') === '' ? 'undefined' : wx.getStorageSync('openid')
      },
      dataType: "json",
      success: function(res) {
        console.log(res)
        that.setData({
          pic_src: res.data.spec_pic ? (res.data.spec_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x):[],
          hasFavor: res.data.hasFavor,
          exhibit_information: {
            name: res.data.spec_chName,
            category: res.data.spec_classifyPos === null ? "" : res.data.spec_classifyPos,
            share: "/res/share.png",
            audio: '/res/audio.png',
            collect: (res.data.spec_collector === null ? "" : "采集人：" + res.data.spec_collector) + (res.data.spec_collectPos === null ? "" : " 采集地：" + res.data.spec_collectPos),
            specimen_description: res.data.spec_description === null ? "暂缺" : res.data.spec_description,
            bar: '/res/bar.png',
          }
        });
        console.log(that.data.exhibit_information.category)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide')
    this.closeAudio()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.closeAudio()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  },

  setFavor: function () {
    var that = this;
    if (wx.getStorageSync('encrypteddata') === '') {
      wx.showModal({
        title: '提示',
        content: '请前往个人中心登录后再使用该功能！',
        duration: 1000,
        showCancel: false,
      })
      return;
    }
    if (this.data.hasFavor) {    //取消收藏
      wx.request({
        url: "https://www.sysubiomuseum.com/userFavor/removefavor",
        data: {
          specId: this.id,
          openid: wx.getStorageSync('openid'),
          specType: 'fossil'
        },
        method: "GET",
        dataType: "json",
        success: function (res) {
          if (res.data.result === 'success') {
            that.setData({
              hasFavor: false
            });
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              duration: 1200
            })
          }
        }
      })
    }
    else {                      //收藏
      wx.request({
        url: "https://www.sysubiomuseum.com/userFavor/addfavor",
        data: {
          specId: this.id,
          openid: wx.getStorageSync('openid'),
          specType: 'fossil',
          chName: this.data.exhibit_information.name
        },
        method: "GET",
        dataType: "json",
        success: function (res) {
          if (res.data.result === 'success') {
            that.setData({
              hasFavor: true
            });
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1200
            })
          }
          else {
            wx.showToast({
              title: '收藏失败，请重试',
              image: '/res/failtip.png',//自定义图标的本地路径，image 的优先级高于 icon
              icon: 'success',
              duration: 1200
            })
          }
        }
      })
    }
  },

  imageLoad: function(e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var ratio = this.data.screenWidth / width;
    this.setData({
      exhibitImageHeight: ratio * height,
    });
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
        type: 'fossil',
        id: self.id,
        transfer_data: e.currentTarget.dataset.title + ',' + e.currentTarget.dataset.transfer_data,
        title: e.currentTarget.dataset.filename
      },
      method: 'POST',
      success: (res) => {
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
  }
})