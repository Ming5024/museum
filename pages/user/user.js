// pages/user/user.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sex:"Default",
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      app.globalData.userInfo.gender == 0 ? this.setData({ sex: 'Unknown' }) : (app.globalData.userInfo.gender == 1 ? this.setData({ sex: 'Male' }) : this.setData({ sex: 'Female' }))
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true

        })
        res.userInfo.gender == 0 ? this.setData({ sex: 'Unknown' }) : (res.userInfo.gender == 1 ? this.setData({ sex: 'Male' }):this.setData({sex:'Female'}))
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
          res.userInfo.gender == 0 ? this.setData({ sex: 'Unknown' }) : (res.userInfo.gender == 1 ? this.setData({ sex: 'Male' }) : this.setData({ sex: 'Female' }))
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
  func_collection: function(e){
    wx.showToast({
      title: '我的收藏',
      duration:1000
    }) 
  },
  func_history: function (e) {
    wx.showToast({
      title: '我的足迹',
      duration: 1000
    })
  },
  func_qnaire: function (e) {
    wx.showToast({
      title: '调查问卷',
      duration: 1000
    })
  }
})