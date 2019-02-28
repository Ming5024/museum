Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentTab: 0,
    exhibitImageHeight: 0,
    audioContext: undefined
  },

  /** 生命周期函数--监听页面加载完成*/
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
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,
        })
      },
    })

    wx.request({
      url: "https://www.sysubiomuseum.com/search/animal",
      data: {
        specId: this.id,
        openid: wx.getStorageSync('encrypteddata') === '' ? 'undefined' : wx.getStorageSync('openid')
      },
      method: "GET",
      dataType: "json",
      success: function(res) {
        var order = res.data.order_chName && res.data.order_chName !== null ? res.data.order_chName : "";
        var family = res.data.family_chName && res.data.family_chName !== null ? res.data.family_chName : "";
        var genus = res.data.genus_chName && res.data.genus_chName !== null ? res.data.genus_chName : "";
        // var date = res.data.specimen_colDate === null ? "" : res.data.specimen_colDate;
        // var formatDate = "";
        // if (date != "") {
        //   date = date.match(/\d+/g);
        //   for (var i = 0; i < date.length - 1; i++) {
        //     formatDate += date[i] + "-";
        //   }
        //   formatDate += date[date.length - 1];
        // }
      
        // var specimenDesArray = res.data.specimen_des === null ? "" : res.data.specimen_des;
        // specimenDesArray = specimenDesArray.split(" ");
        // var specimenDes = "";
        // for (var j = 0; j < specimenDesArray.length - 1; j++) {
        //   specimenDes += j + 1 + ")" + specimenDesArray[j] + "\n";
        // }
        // specimenDes += j + 1 + ")" + specimenDesArray[specimenDesArray.length - 1];
        // var collectPosition = (res.data.specimen_province === null ? "" : res.data.specimen_province) + (res.data.specimen_city === null ? "" : res.data.specimen_city) + (res.data.specimen_loc === null ? "" : res.data.specimen_loc);
        that.setData({
          pic_src: (res.data.spec_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x), 
          hasFavor: res.data.hasFavor,
          exhibit_information: {
            share: "/res/share.png",
            bar: "/res/bar.png",
            audio: '/res/audio.png',
            name: res.data.spec_chName,
            nickname: res.data.spec_commonName === null ? "" : "(俗名：" + res.data.spec_commonName + ")",
            // gender: res.data.specimen_sex === "♂" ? "/res/male.png" : "/res/female.png",
            category: order + family + genus,
            order: order,
            order_description: res.data.order_des,
            family: family,
            family_description: res.data.family_des,
            genus: genus,
            genusdescription: res.data.genus_des,
            habit: res.data.habit === null ? "" : res.data.habit,
            distribution: (res.data.spec_distrWorld === null ? "" : "世界分布：" + res.data.spec_distrWorld + "\n") + (res.data.spec_distrIn === null ? "" : "国内分布：" + res.data.spec_distrIn),
            classification_feature: res.data.spec_divFeature === null ? "" : res.data.spec_divFeature,
            // position: res.data.specimen_pos === null ? "" : "位置：" + res.data.specimen_pos,
            // collect: (res.data.specimen_collector === null ? "" : "采集人：" + res.data.specimen_collector) + (formatDate === "" ? "" : " 采集时间：" + formatDate) + (collectPosition === "" ? "" : " 采集地点：" + collectPosition),
            // specimen_description: specimenDes,
          }
        });
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

  setFavor: function() {
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
    if(this.data.hasFavor) {    //取消收藏
      wx.request({
        url: "https://www.sysubiomuseum.com/userFavor/removefavor",
        data: {
          specId: this.id,
          openid: wx.getStorageSync('openid'),
          specType: 'animal'
        },
        method: "GET",
        dataType: "json",
        success: function (res) {
          if(res.data.result === 'success') {
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
          specType: 'animal',
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
        type: 'animal',
        id: self.id,
        transfer_data: e.currentTarget.dataset.title + ',' + e.currentTarget.dataset.transfer_data,
        title: e.currentTarget.dataset.filename
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        // if(this.data.audioContext) {
        //   console.log(this.data.audioContext)
        //   this.data.audioContext.destroy()
        //   console.log(this.data.audioContext)
        // }
        // if(self.audioContext) self.audioContext.destroy()
        
        // let audioContext = wx.createInnerAudioContext()
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
  switchAudio () {
    if (!this.data.paused) {
      this.audioContext.pause()
    } else {
      this.audioContext.play()
    }
    this.setData({
      paused: !this.data.paused
    })
    
  },
  closeAudio () {
    this.audioContext.stop()
    this.setData({
      playing: false,
      paused: false
    })
  }
})