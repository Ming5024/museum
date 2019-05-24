// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ['', '', '', '', '', '', '', '', '', ''],
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.sysubiomuseum.com/game/getorder',
      // url: 'http://www.sysubiomuseum.com:8081/game/getorder',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data: {
      },
      method: "GET",
      success: res => {
        this.setData({
          orderList: res.data.list
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

  bindKeyInput: function (e) {
    console.log(e)
    var str = `inputValue[${e.target.dataset.id}]`
    console.log(str)
    this.setData({
      [str]: e.detail.value
    })
    console.log(this.data.inputValue)
  },

  submitAns: function () {
    var self = this
    wx.request({
      url: 'https://www.sysubiomuseum.com/game/check',
      // url: 'http://www.sysubiomuseum.com:8081/game/check',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data: {
        order_list: JSON.stringify(self.data.orderList),
        answer_list: JSON.stringify(self.data.inputValue),
        openid: wx.getStorageSync('openid')
      },
      method: "POST",
      success: res => {
        self.setData({
          correctNum: res.data.correctNum,
          showModal: true
        })
      }
    })
  },
  returnIndex: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  preventTouchMove: function (e) {

  },
  hideMask() {
    this.setData({
      showModal: false
    })
  },
})