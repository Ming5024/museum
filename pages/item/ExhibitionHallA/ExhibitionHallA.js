Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;

    wx.request({
      url: "https://www.sysubm.com/search/exhibition",
      method: "GET",
      data: {sectionId: id},
      dataType: "json",
      success: function(res) {
        var exhibitsPic = (res.data.exhibits_pics).map(x => "https://www.sysubm.com/static/exhibitionpic/" + x);
        var exhibitTitle = (res.data.exhibits);
        var exhibitId = res.data.exhibits_id;

        if (exhibitsPic.length % 2 != 0) {
          exhibitsPic.push("");
          exhibitTitle.push("");
          exhibitId.push("");
        }

        var exhibitsArray = [];
        for (var i = 0; i < exhibitsPic.length; i += 2) {
          var temp = [];
          temp.push({id: exhibitId[i], title: exhibitTitle[i], picture: exhibitsPic[i]});
          temp.push({id: exhibitId[i + 1], title: exhibitTitle[i + 1], picture: exhibitsPic[i + 1]});
          exhibitsArray.push(temp);
        }

        that.setData({
          introduction: res.data.intro === null ? "" : res.data.intro,
          exhibitions: exhibitsArray,
          exhibitionHallImageUrls: (res.data.pic).map(x => "https://www.sysubm.com/static/exhibitionpic/" + x),
          exhibitTitle: res.data.exhibits,
          indicator: "1/" + res.data.pic.length,
          articleTitle: res.data.chName,
        });

        wx.setNavigationBarTitle({
          title: res.data.chName,
        })
      },
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,
          screenHeight: res.windowHeight,
          indicatorLeft: res.windowWidth - 45,
        });
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  imageLoad: function (e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var ratio = this.data.screenWidth / width;
    this.setData({
      offsetTop: (this.data.screenHeight - (ratio * height)) / 2,
    });
  },

  imageChange: function (e) {
    var index = e.detail.current;
    var totalNum = this.data.exhibitionHallImageUrls.length;
    this.setData({
      indicator: index + 1 + "/" + totalNum,
    })
  },

  imageTap: function(e) {
    wx.navigateTo({
      url: "/pages/item/exhibitionInfo/exhibitionInfo?info=" + JSON.stringify(e.target.dataset.exhibit_info,),
    })
  },

  hideImage: function (e) {
    this.setData({
      isShow: false,
    });
  },

  showImage: function (e) {
      this.setData({
        showPicture: e.target.dataset.src,
        isShow: true,
      });
  }
})