//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    covercontent: '每周二至周日9：00-17：00\n每周一闭馆（国家法定节假日除外）',
    para1: '国家二级博物馆，中山大学生物博物馆 （The Museum of Biology， Sun Yat－sen University）是非营利的高等院校自然博物馆，以妥善、永久保藏国家自然资源，为教学、科研、全民科学普及和政府决策服务为宗旨。\n\n',
    para2: '博物馆由动物、昆虫、植物、化石标本馆和竹种标本园组成；其中植物标本馆始于1916年的CCC（Canton Christian College）标本馆，动物标本馆建于20世纪20年代，昆虫标本馆的前身是在亚洲享有盛誉的原岭南大学自然博物采集所昆虫标本馆。现有馆藏标本超过120万号，包括国家一级重点保护动物大熊猫、金丝猴、丹顶鹤、巨蜥、蟒、白鲟等35种，以及北极熊、猩猩、土豚、蜂鸟、企鹅等国外的珍稀动物标本；是国内唯一具有华南地区动植物区系特色馆藏的高校生物博物馆。最早的标本采集于1808年，历史久远。',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls:[
      '/res/scrollimg1.png',
      '/res/scrollimg2.png',
      '/res/scrollimg3.png',
      '/res/scrollimg4.png',
      '/res/scrollimg5.png',
      '/res/scrollimg6.png',
    ],
    top:0
  },
  //事件处理函数
  onLoad: function () {
  },

  pushdown:function(e){
    wx.pageScrollTo({
      scrollTop: this.data.windowHeight,
      duration: 1000,
    })
  }
})
