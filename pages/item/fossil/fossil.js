Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
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
        that.setData({
          pic_src: res.data.spec_pic ? (res.data.spec_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x):[],
          hasFavor: res.data.hasFavor,
          exhibit_information: {
            name: res.data.spec_chName,
            category: res.data.spec_classifyPos === null ? "" : res.data.spec_classifyPOs,
            share: "/res/share.png",
            collect: (res.data.spec_collector === null ? "" : "采集人：" + res.data.spec_collector) + (res.data.spec_collectPos === null ? "" : " 采集地：" + res.data.spec_collectPos),
            specimen_description: res.data.spec_description === null ? "暂缺" : res.data.spec_description,
            bar: '/res/bar.png',
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
  }
})