// pages/item/animalExhibitionShelf/animalExhibitionShelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exhibitionImageHeight:0,
    exhibitionImageUrls:[
      "/res/p1.jpg",
      "/res/p1.jpg",
      "/res/p1.jpg",
    ],
    mainContent: "鸣禽为雀形目鸟类，种类繁多，包括83科。鸣禽善于鸣叫，由鸣管控制发音。鸣管结构复杂而发达，大多数种类具有复杂的的鸣肌附于鸣管的两侧。鸣禽是鸟类中最进化的类群。分布广，能够适应多种多样生态环境，因此外部形态变化复杂，相互间的差异十分明显。大多数属小型鸟类；嘴小而强；脚较短而强。鸣禽多数种类营树栖生活，少数种类为地栖。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,
          indicatorLeft: res.windowWidth - 45,
          indicator: "1/" + that.data.exhibitionImageUrls.length,
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
      exhibitionImageHeight: ratio * height,
    });
  },

  imageChange: function (e) {
    var index = e.detail.current;
    var totalNum = this.data.exhibitionImageUrls.length;
    this.setData({
      indicator: index + 1 + "/" + totalNum,
    })
  },
})