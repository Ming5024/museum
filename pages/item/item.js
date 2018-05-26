Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll_y: true,
    currentTab: 0,
    pic_src: '/res/bird2.jpg',
    mode: 'aspectFit',
    exhibit_information: {
      name: '蜂鸟',
      category: 'xx目xx纲属种',
      share: '/res/share.png',
      star: '/res/star.png',
      position: '位置：三楼哺乳动物厅',
      //音频播放器
      audio: {
        playing: false,
        audio_src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        sliderValue: 0,
        minTime: 0,
        maxTime: 100,
        minMin: '00:00',
        maxMin: '00:00',
      },
      article: '蜂鸟（学名：Trochilidae）是属于雨燕目的蜂鸟科，体型小，能够以快速拍打翅膀（每秒700次，取决于鸟的大小）的方式而悬停在空中，也是唯一可以向后飞的鸟。蜂鸟的飞行本领高超，也被人们称为“神鸟”、“彗星”、“森林女神”和“花冠”等[1]。吸蜜蜂鸟（学名：Mellisuga helenae）仅重1.8公克，是世界上最小的鸟。还有一种典型的北美蜂鸟红喉北蜂鸟（Archilochus colubris）重量约三公克左右，身长7.6公分。蜂鸟中体型最大的是巨蜂鸟（学名：Patagona gigas），其体重也仅20克。在美加常于户外安置特制的“奶瓶”加入人工花蜜喂养蜂鸟，特别是红色等色彩鲜艳的奶瓶，用红色的花形器具都会有极好的招引效果。合适的人工花蜜由一份蔗糖和四份水组成，蔗糖最容易在沸水中溶化，待完全冷却后再提供蜂鸟食用。除了白糖以外也可用其他食物，但如蜂蜜发酵太快，会因此而会伤到蜂鸟。也有一些出售的蜂鸟食品，但是通常含有不需要的红色色素，有报道称色素会使蜂鸟中毒。出售的蜂鸟食品也包含少量的营养物，但是蜂鸟显然以捕食昆虫来获取营养，所以营养物较不需要，用白糖和水便可作成最适合它们的花蜜蜂鸟的“奶瓶”应每周清洗和更换糖水，如果气候暖和的话要更频繁，最少一个月更换一次，或发现黑色霉菌出现时便必须更换，“奶瓶”应在氯漂白粉溶液中浸泡。蜂鸟不愿意使用肥皂清洗过的“奶瓶”，因为它们较不喜欢肥皂的气被困的蜂鸟蜂鸟有时会误入车库被困住，因为它们将悬挂的门闩手柄（通常为红色）误认为是花朵，但有时蜂鸟也会被不含任何红色的围栏所困住。一旦被困在里面，蜂鸟可能无法逃脱，因为它们在遇到威胁或被困住的时候本能反应是向上飞。这将威胁到蜂鸟的生命，它们会因为体力耗尽而在短时间内死亡，可能短于一个小时。如果蜂鸟被困住，你可以轻易地抓住它并释放到室外，被抓在手中时它会保持安静直到被释放',
    },
    reference_information_array: [
      {
        title: '中国古典生物学（上）',
        author: '李白著人民日报出版社',
        page: '第245页',
        article: '在美加常于户外安置特制的“奶瓶”加入人工花蜜喂养蜂鸟，特别是红色等色彩鲜艳的奶瓶，用红色的花形器具都会有极好的招引效果。合适的人工花蜜由一份蔗糖和四份水组成，蔗糖最容易在沸水中溶化，待完全冷却后再提供蜂鸟食用。除了白糖以外也可用其他食物，但如蜂蜜发酵太快，会因此而会伤到蜂鸟。',
      },
      {
        title: '中国古典生物学（上）',
        author: '李白著人民日报出版社',
        page: '第245页',
        article: '在美加常于户外安置特制的“奶瓶”加入人工花蜜喂养蜂鸟，特别是红色等色彩鲜艳的奶瓶，用红色的花形器具都会有极好的招引效果。合适的人工花蜜由一份蔗糖和四份水组成，蔗糖最容易在沸水中溶化，待完全冷却后再提供蜂鸟食用。除了白糖以外也可用其他食物，但如蜂蜜发酵太快，会因此而会伤到蜂鸟。',
      },
      {
        title: '中国古典生物学（上）',
        author: '李白著人民日报出版社',
        page: '第245页',
        article: '在美加常于户外安置特制的“奶瓶”加入人工花蜜喂养蜂鸟，特别是红色等色彩鲜艳的奶瓶，用红色的花形器具都会有极好的招引效果。合适的人工花蜜由一份蔗糖和四份水组成，蔗糖最容易在沸水中溶化，待完全冷却后再提供蜂鸟食用。除了白糖以外也可用其他食物，但如蜂蜜发酵太快，会因此而会伤到蜂鸟。',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //跳转测试
    console.log(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio');
    //获取设备的可视窗口高度
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        })
      },
    });
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

  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  },

  onPlay() {
    this.data.exhibit_information.audio.playing = true;
    this.setData(this.data);
  },

  onStop() {
    this.data.exhibit_information.audio.playing = false;
    this.setData(this.data);
  },

  seek(e) {
    var cur = Math.round(e.detail.value);
    this.audioCtx.seek(cur);
  },

  onTimeUpdate(e) {
    //通过audio的属性秒数计算当前分钟和秒数
    let currentMin = Math.floor(e.detail.currentTime / 60);
    var currentSec = Math.floor(e.detail.currentTime % 60);
    //异常处理
    if (currentSec < 10) {
      currentSec = '0' + currentSec;
    }
    if (currentMin < 10) {
      currentMin = '0' + currentMin;
    }
    //拼接
    var currentTime = currentMin + ':' + currentSec;

    let maxMin = Math.floor(e.detail.duration / 60);
    var maxSec = Math.floor(e.detail.duration % 60);

    if (maxSec < 10) {
      maxSec = '0' + maxSec;
    }
    if (maxMin < 10) {
      maxMin = '0' + maxMin;
    }

    var maxTime = maxMin + ':' + maxSec;
    //自动更新UI
    this.data.exhibit_information.audio.minMin = currentTime;
    this.data.exhibit_information.audio.maxMin = maxTime;
    this.data.exhibit_information.audio.sliderValue = e.detail.currentTime;
    this.data.exhibit_information.audio.maxTime = e.detail.duration;
    this.setData(this.data);
  },

  play() {
    var playing = this.data.exhibit_information.audio.playing;
    if (playing) {
      this.audioCtx.pause();
    } else {
      this.audioCtx.play();
    }
  },
})