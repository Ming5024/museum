// pages/game/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  start_game: function () {
    wx.navigateTo({
      url: '/pages/game/game/game',
    })
  },

  get_history: function () {
    var self = this
    wx.request({
      url: 'https://www.sysubm.com/game/getrecord',
      // url: 'http://www.sysubm.com:8081/game/getrecord',
      data: {
        openid: wx.getStorageSync('encrypteddata') === '' ? 'undefined' : wx.getStorageSync('openid')
      },
      dataType: "json",
      method: "GET",
      success: res => {
        console.log(res.data)
        self.setData({
          recordList: res.data.record.reverse(),
          showModal: true
        })
      }
    })
  },

  closeModal: function () {
    this.setData({
      showModal: false
    })
  }
})