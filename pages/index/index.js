//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    covercontent: '每周六至周日9：00-17：00\n每周一至周五闭馆（国家法定节假日除外）',
    intro: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    guide_pic: {},
    top:0
  },
  //事件处理函数
  onLoad: function () {
    //请求页面数据
    wx.request({
      url: 'https://www.sysubiomuseum.com/search/mainintro',
      method: 'GET',
      success: res=>{
        for (var i = 0; i < res.data.guide_pic.length; i++) {
          res.data.guide_pic[i] = "https://www.sysubiomuseum.com/pic/exhibitionpic/" + res.data.guide_pic[i];
        }
        this.setData({
          intro: "&nbsp;&nbsp;"+res.data.simple_intro.replace("\r\n", "\r\n&nbsp;&nbsp;"),
          guide_pic: res.data.guide_pic
        }) 
      }
    })
  },

  pushdown:function(e){
    wx.pageScrollTo({
      scrollTop: this.data.windowHeight,
      duration: 1000,
    })
  }
})
