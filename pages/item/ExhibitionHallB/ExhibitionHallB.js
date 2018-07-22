Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;

    wx.request({
      url: "http://172.18.233.8:52080/search/exhibition",
      method: "GET",
      data: {sectionId: id},
      dataType: "json",
      success: function(res) {
        var exhibitAreaId = res.data.exhiareas_id;
        var exhibitPic = (res.data.exhibits_pics).map(x => x.map(y => "http://172.18.233.8:52080/pic/exhibitionpic/" + y));
        var exhibitArea = res.data.exhiareas;
        var exhibit = res.data.exhibits;
        var exhibitId = res.data.exhibits_id;
        var exthibitAreaArray = [];      
        var foldArray = [];
        var arrowUrlArray = [];
        var exhibitionsVisibleArray = [];

        for (var i = 0; i < exhibitAreaId.length; i++) {
          foldArray.push(true);
          arrowUrlArray.push("/res/right_arrow.png");
          exhibitionsVisibleArray.push("none");

          var area = {};
          area.name = exhibitArea[i];
          area.exhibitions = [];
          if (exhibit[i].length % 2 != 0) {
            exhibit[i].push("");
            exhibitId[i].push("");
            exhibitPic[i].push("");
          }

          for (var j = 0; j < exhibit[i].length; j += 2) {
            var temp = [];
            temp.push({ title: exhibit[i][j], id: exhibitId[i][j], picture: exhibitPic[i][j]})
            temp.push({ title: exhibit[i][j + 1], id: exhibitId[i][j + 1], picture: exhibitPic[i][j + 1]});
            area.exhibitions.push(temp);
          }

          exthibitAreaArray.push(area);
        }

        that.setData({
          exhibitionHallImageUrls: (res.data.pic).map(x => "http://172.18.233.8:52080/pic/exhibitionpic/" + x),
          articleTitle: res.data.chName,
          introduction: res.data.intro === null ? "" : res.data.intro,
          indicator: "1/" + (res.data.pic).length,
          exhibitionAreas: exthibitAreaArray,
          fold: foldArray,
          arrowUrl: arrowUrlArray,
          exhibitionsVisible: exhibitionsVisibleArray,
        });

        wx.setNavigationBarTitle({
          title: res.data.chName,
        });
      }
    })

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenWidth: res.windowWidth,
          screenHeight: res.windowHeight,
          indicatorLeft: res.windowWidth - 45,
        });
      },
    });
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

  imageLoad:function(e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var ratio = this.data.screenWidth / width;
    this.setData({
      exhibitionHallImageHeight: ratio * height,
      offsetTop: (this.data.screenHeight - (ratio * height)) / 2,
    });
  },

  imageChange:function(e) {
    var index = e.detail.current;
    var totalNum = this.data.exhibitionHallImageUrls.length;
    this.setData({
      indicator: index + 1 + "/" + totalNum,
    })
  },

  showExhibitions:function(e) {
    var index = e.currentTarget.dataset.index;
    var temp1 = this.data.exhibitionsVisible;
    var temp2 = this.data.arrowUrl;
    var temp3 = this.data.fold;
    if (e.currentTarget.dataset.fold) {
      temp1[index] = "block";
      temp2[index] = "/res/down_arrow.png";
      temp3[index] = false;
      this.setData({
        exhibitionsVisible:temp1,
        arrowUrl:temp2,
        fold:temp3,
      });
    } else {
      temp1[index] = "none";
      temp2[index] = "/res/right_arrow.png";
      temp3[index] = true;
      this.setData({
        exhibitionsVisible:temp1,
        arrowUrl:temp2,
        fold:temp3,
      })
    }
  },

  imageTap: function(e) {
    wx.navigateTo({
      url: "/pages/item/exhibitionInfo/exhibitionInfo?info=" + JSON.stringify(e.target.dataset.exhibit_info, ),
    })
  },

  hideImage: function(e) {
    this.setData({
      isShow: false,
    });
  },

  showImage: function(e) {
    console.log(e.target.dataset.src),
    this.setData({
      showPicture: e.target.dataset.src,
      isShow: true,
    });
  }
})