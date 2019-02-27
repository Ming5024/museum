Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentTab: 0,
    exhibitImageHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //跳转测试
    this.id = options.id;
    // var id = options.id;
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,
        })
      },
    });
    wx.request({
      url: "https://www.sysubiomuseum.com/search/plant",
      method: "GET",
      data: {
        specId: this.id,
        openid: wx.getStorageSync('encrypteddata') === '' ? 'undefined' : wx.getStorageSync('openid')
      },
      dataType: "json",
      success: function(res) {
        console.log(res)
        // var date = res.data.specimen_colDate;
        // if (date != null) {
        //   date.match(/(\d{4})(\d{0,2})(\d{0,2})/);
        //   date = RegExp.$1 + (RegExp.$2 === "" ? "" : "-" + RegExp.$2) + (RegExp.$3 === "" ? "" : "-" + RegExp.$3);
        // } else {
        //   date = "";
        // }

        // var province = res.data.specimen_province === null ? "" : res.data.specimen_province;
        // var city = res.data.specimen_city === null ? "" : res.data.specimen_city;
        // var loc = res.data.specimen_loc === null ? "" : res.data.specimen_loc;

        // var specDes = res.data.specimen_des === null ? "" : res.data.specimen_des;
        // if (specDes != "") {
        //   specDes.match(/[^，；。]+[，；。]*/g).map((e, i) => i + 1 + ")" + e + "\n").reduce((a, b) => a.concat(b));
        // }
        console.log((res.data.spec_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x))
        that.setData({
          pic_src: (res.data.spec_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x),
          hasFavor: res.data.hasFavor,
          exhibit_information: {
            name: res.data.spec_chName,
            nickname: res.data.spec_Alias === null ? "" : "俗名：" + res.data.spec_Alias,
            category: res.data.genus_chName && res.data.genus_chName !== null ? res.data.genus_chName : "",
            share: '/res/share.png',
            genus: res.data.genus_chName && res.data.genus_chName !== null ? res.data.genus_chName : "",
            genusdescription: res.data.genus_des,
            // position: res.data.specimen_pos === null ? "" : "存放位置：" + res.data.specimen_pos,
            // collect: (res.data.specimen_collector === null ? "" : "采集人：" + res.data.specimen_collector) + (date === "" ? "" : " 采集日期：" + date) + (province + city + loc === "" ? "" : " 采集地点：" + province + city + loc),
            bar: "/res/bar.png",
            audio: '/res/audio.png',
            // specimen_description: specDes,
            morphology_description: res.data.spec_formDes === null ? "" : res.data.spec_formDes,
            surroundings: res.data.spec_envir === null ? "" : res.data.spec_envir,
            application_value: res.data.spec_value === null ? "" : res.data.spec_value,
            distribution: (res.data.spec_distrWorld === null ? "" : "世界分布：" + res.data.spec_distrWorld) + (res.data.spec_distrIn === null ? "" : "\n" + res.data.spec_distrIn),
          }
        })
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
          specType: 'plant'
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
          specType: 'plant',
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

  imageLoad: function (e) {
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
        type: 'plant',
        id: self.id,
        transfer_data: e.currentTarget.dataset.title + ',' + e.currentTarget.dataset.transfer_data,
        title: e.currentTarget.dataset.filename
      },
      method: 'POST',
      success: (res) => {
        if (this.data.audioContext) {
          console.log(this.data.audioContext)
          this.data.audioContext.destroy()
          console.log(this.data.audioContext)
        }

        let audioContext = wx.createInnerAudioContext()
        self.setData({
          playing: true,
          paused: false,
          audioTitle: e.currentTarget.dataset.title,
          audioContext: audioContext
        })
        self.data.audioContext.src = res.data.url
        self.data.audioContext.autoplay = true
        self.data.audioContext.onEnded((e) => {
          self.setData({
            playing: false,
            paused: false
          })
        })
        self.data.audioContext.play()
      }
    })
  },
  switchAudio() {
    if (!this.data.paused) {
      console.log(this.data.audioContext)
      this.data.audioContext.pause()
    } else {
      this.data.audioContext.play()
    }
    this.setData({
      paused: !this.data.paused
    })

  },
  closeAudio() {
    this.data.audioContext.destroy()
    this.setData({
      playing: false,
      paused: false
    })
  }
})