Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    currentTab: 0,
    exhibitImageHeight: 0,
    audioContext: undefined,
    showModal: false,
    showPoster: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //跳转测试
    wx.showShareMenu({
      withShareTicket: true
    })
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
    });

    wx.request({
      url: "https://www.sysubm.com/search/insect",
      data: {
        specId: this.id,
        openid: wx.getStorageSync('encrypteddata') === '' ? 'undefined' : wx.getStorageSync('openid')
      },
      method: "GET",
      dataType: "json",
      success: function(res) {
        console.log(res)
        var family = res.data.family_chName && res.data.family_chName !== null ? res.data.family_chName : "";
        var genus = res.data.genus_chName && res.data.family_chName !== null ? res.data.genus_chName : "";
        // var speciDes = res.data.specimen_des === null ? "" : res.data.specimen_des;
        // if (speciDes != "") {
        //   console.log(speciDes)
        //   speciDes = speciDes.match(/.*?。/).map((e, i) => i + 1 + ")" + e + "\n").reduce((a, b) => a.concat(b));
        // }

        // var province = res.data.specimen_province === null ? "" : res.data.specimen_province;
        // var city = res.data.specimen_city === null ? "" : res.data.specimen_city;
        // var loc = res.data.specimen_loc === null ? "" : res.data.specimen_loc;
        that.setData({
          pic_src: res.data.spec_pic ? (res.data.spec_pic).map(x => "https://www.sysubm.com/static/" + x):[],
          hasFavor: res.data.hasFavor,
          exhibit_information: {
            name: res.data.spec_chName === null ? "" : res.data.spec_chName,
            nickname: res.data.spec_commonName === null ? "" : "（俗名：" + res.data.spec_commonName + "）",
            category: family + genus,
            share: '/res/share.png',
            // position: res.data.specimen_pos === null ? "" : res.data.specimen_pos,
            // collect: (res.data.specimen_collector === null ? "" : "采集人：" + res.data.specimen_collector) + (res.data.specimen_colDate === null ? "" : " 采集日期：" + res.data.specimen_colDate)  + (province + city + loc  === "" ? "" : "\n采集地点：" + province + city + loc),
            family: family,
            family_formFeature: res.data.family_formFeature === null ? "" : res.data.family_formFeature,
            family_habit: res.data.family_habit === null ? "" : res.data.family_habit,
            genus: genus,
            genus_formFeature: res.data.genus_formFeature === null ? "" : res.data.genus_formFeature,
            genus_habit: res.data.genus_habit === null ? "" : res.data.genus_habit,
            bar: '/res/bar.png',
            audio: '/res/audio.png',
            // specimen_description: speciDes,
            morphology_description: res.data.spec_formDes === null ? "" : res.data.spec_formDes,
            body_length: res.data.spec_length === null ? "" : res.data.spec_length,
            body_color: res.data.spec_bodyColor === null ? "" : res.data.spec_bodyColor,
            habit: res.data.habit === null ? "" : res.data.habit,
            distribution: (res.data.spec_distrWorld === null ? "" : "世界分布：" + res.data.spec_distrWorld + "。") + (res.data.spec_distrIn === null ? "" : "\n国内分布："  + res.data.spec_distrIn + "。"), 
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
  onShareAppMessage: function (e) {
    this.hideMask()
    return {
      title: this.data.exhibit_information.name,
      path: `/pages/item/insect/insect?id=${this.id}`,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
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
        url: "https://www.sysubm.com/userFavor/removefavor",
        data: {
          specId: this.id,
          openid: wx.getStorageSync('openid'),
          specType: 'insect'
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
        url: "https://www.sysubm.com/userFavor/addfavor",
        data: {
          specId: this.id,
          openid: wx.getStorageSync('openid'),
          specType: 'insect',
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
      url: 'https://www.sysubm.com/aip/getaip',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        type: 'insect',
        id: self.id,
        transfer_data: e.currentTarget.dataset.title + ',' + e.currentTarget.dataset.transfer_data,
        title: e.currentTarget.dataset.filename
      },
      method: 'POST',
      success: (res) => {
        console.log('success')
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
  share() {
    this.setData({
      showModal: true
    })
  },
  capture_pic(e) {
    var self = this
    var date = new Date()
    this.setData({
      showModal: false,
      posterContent: '',
      posterDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: [`${e.currentTarget.dataset.type}`],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success(res) {
            const savedFilePath = res.savedFilePath
            self.setData({
              showPoster: true,
              posterImage: savedFilePath
            })
          }
        })
      }
    })
  },
  preventTouchMove(e) {

  },
  hideMask() {
    this.setData({
      showModal: false,
      showPoster: false
    })
  },
  generate_poster() {
    console.log('图片海报已生成')
    var self = this
    const query = wx.createSelectorQuery()
    query.select('.poster-view-canvas').boundingClientRect()
    query.select('.poster-content-image').boundingClientRect()
    query.select('#poster-image').boundingClientRect()
    query.exec(function (res) {
      console.log(res)
      console.log(self.translateRpxToPx((res[1].width - res[2].width) / 2), self.translateRpxToPx(190), self.translateRpxToPx(res[2].width), self.translateRpxToPx(res[2].height))
      self.drawCanvas((res[1].width - res[2].width) / 2, self.translateRpxToPx(190), res[2].width, res[2].height, res[0].width, res[0].height)
    })
    // this.hideMask()
  },
  bindKeyInput(e) {
    this.setData({
      posterContent: e.detail.value
    })
  },
  translateRpxToPx(rpx) {
    var systemInfo = wx.getSystemInfoSync();
    return rpx / 750 * systemInfo.windowWidth;
  },
  drawCanvas(imagesx, imagesy, imagewidth, imageheight, canvasWidth, canvasHeight) {
    var self = this
    var postContext = wx.createCanvasContext("poster", this)
    postContext.setFillStyle('white')
    postContext.fillRect(0, 0, canvasWidth, canvasHeight)
    postContext.setFillStyle('black')
    postContext.font = "16px 'FZSJ-XUYYH-DC'"
    postContext.drawImage('/res/logo.png', this.translateRpxToPx(20), this.translateRpxToPx(20), this.translateRpxToPx(120), this.translateRpxToPx(120))
    postContext.fillText(`SYSBM - ${this.data.exhibit_information.name}`, this.translateRpxToPx(140), this.translateRpxToPx(80) + 8)
    postContext.drawImage(this.data.posterImage, imagesx, imagesy, imagewidth, imageheight)
    postContext.textAlign = "right"  //文字居右
    console.log(canvasWidth)
    postContext.fillText(this.data.posterContent, canvasWidth - this.translateRpxToPx(30), this.translateRpxToPx(640) + 16)
    postContext.fillText(this.data.posterDate, canvasWidth - this.translateRpxToPx(30), this.translateRpxToPx(640) + 32)
    postContext.drawImage('/res/code.png', 0, canvasHeight * 0.8, canvasWidth, canvasHeight * 0.2)
    postContext.draw()

    setTimeout((e) => {
      self.saveCanvas()
    }, 500)
  },
  saveCanvas() {
    var self = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'poster',
      success: function (res) {
        let shareImg = res.tempFilePath
        console.log(self.data.posterImage)
        self.hideMask()
        wx.getSetting({
          success(res) {
            // 如果没有则获取授权
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  console.log(shareImg)
                  wx.saveImageToPhotosAlbum({
                    filePath: shareImg,
                    success() {
                      wx.showToast({
                        title: '保存成功'
                      })
                    },
                    fail() {
                      wx.showToast({
                        title: '保存失败',
                        icon: 'none'
                      })
                    }
                  })
                },
                fail() {
                }
              })
            } else {
              // 有则直接保存
              wx.saveImageToPhotosAlbum({
                filePath: shareImg,
                success() {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          }
        })
        wx.uploadFile({
          url: 'https://www.sysubm.com/upload',
          filePath: self.data.posterImage,
          name: 'file',
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          }
        })
        wx.request({
          url: "https://www.sysubm.com/share/addshare",
          data: {
            specId: self.id,
            chName: self.data.exhibit_information.name,
            openid: wx.getStorageSync('openid'),
            specType: 'insect',
            filePath: self.data.posterImage,
            content: self.data.posterContent,
            shareDate: self.data.posterDate
          },
          method: "GET",
          dataType: "json",
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
      fail: function (res) {
      }
    })
  }
})