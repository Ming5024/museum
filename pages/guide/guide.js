                             // 
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
	
     pics:{},
   
    touch: {
      distance: 0,
      scale: 1,
      baseWidth: null,
      baseHeight: null,
      scaleWidth: null,
      scaleHeight: null
    }
    

  },
  touchstartCallback: function (e) {
    // 单手指缩放开始，也不做任何处理 if(e.touches.length == 1) return console.log('双手指触发开始')
    // 注意touchstartCallback 真正代码的开始 // 一开始我并没有这个回调函数，会出现缩小的时候有瞬间被放大过程的bug // 当两根手指放上去的时候，就将distance 初始化。 let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    this.setData({
      'touch.distance': distance,
    })
  },
  touchmoveCallback: function (e) {
    let touch = this.data.touch
    // 单手指缩放我们不做任何操作 if(e.touches.length == 1) return console.log('双手指运动')
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    // 新的 ditance let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    let distanceDiff = distance - touch.distance;
    let newScale = touch.scale + 0.005 * distanceDiff
    {
    newScale = 2
  }
        if(newScale <= 0.6) {
  newScale = 0.6
}
let scaleWidth = newScale * touch.baseWidth
let scaleHeight = newScale * touch.baseHeight
({
'touch.distance': distance,
  'touch.scale': newScale,
    'touch.scaleWidth': scaleWidth,
      'touch.scaleHeight': scaleHeight,
        'touch.diff': distanceDiff
        })
  }, bindload: function (e) {
   ({
    'touch.baseWidth': e.detail.width,
      'touch.baseHeight': e.detail.height,
        'touch.scaleWidth': e.detail.width,
          'touch.scaleHeight': e.detail.height
  })
    },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    wx.request({
      url: 'https://www.sysubm.com/search/mainintro',
      method: 'GET',
      success: res => {
        for (var i = 0; i < res.data.guide_pic.length; i++) {
          res.data.guide_pic[i] = "https://www.sysubm.com/static/exhibitionpic/" + res.data.guide_pic[i];
        }
        this.setData({
          intro: "&nbsp;&nbsp;" + res.data.simple_intro.replace("\r\n", "\r\n&nbsp;&nbsp;"),
          pics: res.data.guide_pic
        })
      }
    })
  },
 
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})  
