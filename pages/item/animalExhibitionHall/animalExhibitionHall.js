Page({

  /**
   * 页面的初始数据
   */
  data: {
    exhibitionHallImageUrls: [
      "/res/p1.jpg",
      "/res/p2.jpg",
      "/res/p3.jpg"
    ],

    exhibitionAreas: [
      {
        name:"海洋展区",
        exhibitions: [
          ["/res/p1.jpg", "/res/p1.jpg"],
          ["/res/p1.jpg", "/res/p1.jpg"],
        ],
      },
      {
        name: "海洋展区",
        exhibitions: [
          ["/res/p1.jpg", "/res/p1.jpg"],
          ["/res/p1.jpg", "/res/p1.jpg"],
        ],
      },
      {
        name: "海洋展区",
        exhibitions: [
          ["/res/p1.jpg", "/res/p1.jpg"],
          ["/res/p1.jpg", "/res/p1.jpg"],
        ],
      },
    ],
    
    fold: [true, true, true],
    arrowUrl: ["/res/right_arrow.png", "/res/right_arrow.png", "/res/right_arrow.png"],
    exhibitionsVisible:["none", "none", "none"], 
    exhibitionHallImageHeight:0,
    articleTitle: "展厅介绍",
    introduction: "博物馆搜藏并维护具有科学、艺术或历史重要性的物件，并透过展示（常设展或特展），使公众得以观看这些物件。大多数的大型博物馆位于世界各地的重要城市，更具地方性质的博物馆位于较小城市、城镇甚至乡村[2]。一般人归纳出博物馆所富有之功能为：典藏、研究、展示、教育四大项"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenWidth: res.windowWidth,
          indicatorLeft: res.windowWidth - 45,
          indicator: "1/" + that.data.exhibitionHallImageUrls.length,
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

})