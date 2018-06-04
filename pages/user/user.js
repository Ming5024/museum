// pages/user/user.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sex:"",
    age:"",
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      app.globalData.userInfo.gender == 0 ? this.setData({ sex: '' }) : (app.globalData.userInfo.gender == 1 ? this.setData({ sex: '男' }) : this.setData({ sex: '女' }))
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true

        })
        res.userInfo.gender == 0 ? this.setData({ sex: '' }) : (res.userInfo.gender == 1 ? this.setData({ sex: '男' }):this.setData({sex:'女'}))
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          res.userInfo.gender == 0 ? this.setData({ sex: '' }) : (res.userInfo.gender == 1 ? this.setData({ sex: '男' }) : this.setData({ sex: '女' }))
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  modal_collection: function(e){
    wx.showModal({
      title: '提示',
      content: '该功能正在路上，敬请期待',
      duration:1000,
      showCancel:false,
    }) 
  },
  modal_history: function (e) {
    wx.showModal({
      title: '提示',
      content: '该功能正在路上，敬请期待',
      duration: 1000,
      showCancel: false,
    })
  },
  modal_questionaire: function (e) {
    wx.showModal({
      title: '提示',
      content: '该功能正在路上，敬请期待',
      duration: 1000,
      showCancel: false,
    })
  },
  editinfo:function(e){
    wx.navigateTo({
      url: '/pages/edituserinfo/edituserinfo',
    })
  }
})