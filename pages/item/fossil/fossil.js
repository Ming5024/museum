Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    exhibitImageHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //跳转测试
    var id = options.id;
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
        chName: id,
        openid: wx.getStorageSync('openid')
      },
      dataType: "json",
      success: function(res) {
        var temp = (res.data.specimen_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x);
        that.setData({
          pic_src: (res.data.specimen_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x),
          exhibit_information: {
            name: res.data.spec_chName,
            category: res.data.spec_classifyPos === null ? "" : res.data.spec_classifyPOs,
            share: "/res/share.png",
            collect: (res.data.spec_collector === null ? "" : "采集人：" + res.data.spec_collector) + (res.data.spec_collectPos === null ? "" : " 采集地：" + res.data.spec_collectPos),
            specimen_description: res.data.spec_description === null ? "" : res.data.spec_description,
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

  imageLoad: function(e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var ratio = this.data.screenWidth / width;
    this.setData({
      exhibitImageHeight: ratio * height,
    });
  }
})