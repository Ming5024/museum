//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    covertitle:'中山大学生物博物馆',
    covercontent: '每周二至周日9：00-17：00\n每周一闭馆（国家法定节假日除外）',
    head: '中山大学生物博物馆简介',
    para1: '中山大学生物博物馆成立于2000年，以进行公众的科学普及教育以及辅助相关大、中、小学的教学为服务宗旨。以丰富的馆藏，极具特色的文化学术氛围，在国际上享有盛誉。博物馆以香港同胞捐赠的“马文辉堂”为馆址，最早的标本采集于1817年，有近200年的历史。\n\n',
    para2: '目前，生物博物馆有植物标本22万号；昆虫标本60余万号；动物标本3万号，包括国家一级保护动物大熊猫、金丝猴等37种，以及护士鲨、豹纹鲨、翻车鱼等百余种珍稀动物标本，此外还有北极熊、企鹅、鸵鸟等国外的珍稀动物标本；古生物化石标本500多件，其中7.8米长萨斯特鱼龙、3.5米的新中国龙、兴义龙以及鳞齿鱼等具有极高的科研价值和展览价值。是国内唯一收藏了大量国内外珍贵生物标本、并具有华南地区动植物区系特色的高校生物博物馆。在国际上享有很高的地位。',
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
      duration: 300,
    })
  }
})
