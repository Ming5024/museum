// pages/guide/guide.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  items:[
    {name:'1F',value:'1F',checked:'true'},
    { name: '2F', value: '2F' },
     { name:'3F', value:'3F'}
  ],
  route:'/images/1F.jpg'
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      route:'/images/1F.jpg'})
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
  radiochange: function (e) {
    var r=null;
    var prefix='/images/';
    var postfix='.jpg';
    r=prefix+e.detail.value+postfix;
    this.setData({route:r});
  }
})