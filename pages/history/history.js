// pages/history/history.js
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

    wx.request({
      url: "https://www.sysubiomuseum.com/userHistory/getHistory",
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res.data.history)
        var history = res.data.history.reverse();
        for(let i of history) {
          if(i.pics.length == 0) {
            i.pics = "/res/unfavor.png"
          }
          else {
            i.pics = `https://www.sysubiomuseum.com/pic/${i.pics[0]}`
          }
        }
        that.setData({
          history: res.data.history
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

  }
})