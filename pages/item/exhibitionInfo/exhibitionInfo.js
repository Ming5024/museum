Page({

  /**
   * 页面的初始数据
   */
  data: { 
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var info = JSON.parse(options.info);
    wx.setNavigationBarTitle({
      title: info.title,
    });

    wx.request({
      url: "https://www.sysubiomuseum.com/search/exhibition",
      method: "GET",
      data: {sectionId: info.id},
      dataType: "json",
      success: function(res) {
        that.setData({
          exhibitionImageUrls: (res.data.pic).map(x => "https://www.sysubiomuseum.com/pic/exhibitionpic/" + x),
          mainContent: res.data.intro === null ? "" : res.data.intro,
          indicator: "1/" + (res.data.pic).length,
          articleTitle: info.title,
        });
      }
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,
          screenHeight: res.windowHeight,
          indicatorLeft: res.windowWidth - 45,         
        });
      },
    });
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

  imageLoad: function (e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var ratio = this.data.screenWidth / width;
    this.setData({
      offsetTop: (this.data.screenHeight - (ratio * height)) / 2,
    });
  },

  imageChange: function (e) {
    var index = e.detail.current;
    var totalNum = this.data.exhibitionImageUrls.length;
    this.setData({
      indicator: index + 1 + "/" + totalNum,
    })
  },

  hideImage: function (e) {
    this.setData({
      isShow: false,
    });
  },

  showImage: function (e) {
      this.setData({
        showPicture: e.target.dataset.src,
        isShow: true,
      });
  }
})