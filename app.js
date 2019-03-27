//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        console.log(res.code)
        wx.setStorageSync("login_code", res.code)
        wx.request({
          url: 'https://www.sysubiomuseum.com/userAuth/login',
          data: {data: code},
          method: "GET",
          dataType: 'json',
          success: res => {
            console.log(res)
            wx.setStorageSync("openid", res.data.openid)
            wx.setStorageSync("session_key", res.data.session_key)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }

              wx.setStorageSync("encrypteddata", res.encryptedData)
              wx.setStorageSync("iv", res.iv)
            },
            fail: res => {
              console.log(res)
            }
          })
        } else {
          // 用户没有授权，用回调进行下一步操作
          this.noAuthCallback(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})