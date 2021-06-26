// pages/favorite/favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var collectionTypeArray = [{
      type: 'animal',
      typechName: "动物",
    }, {
      type: 'plant',
      typechName: "植物",
    }, {
      type: 'insect',
      typechName: "昆虫",
    }, {
      type: 'fossil',
      typechName: "化石",
    }];
    var foldArray = [];
    var arrowUrlArray = [];
    var collectionsVisibleArray = [];

    for (var i = 0; i < collectionTypeArray.length; i++) {
      foldArray.push(true);
      arrowUrlArray.push("/res/right_arrow.png");
      collectionsVisibleArray.push("none");
    }

    wx.request({
      url: "https://www.sysubm.com/userFavor/getfavor",
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        var favors = res.data.favors;
        for (let i of favors) {
          if (i.pics.length == 0) {
            i.pics = "/res/404.jpg"
          }
          else {
            i.pics = `https://www.sysubm.com/static/${i.pics[0]}`
          }
        }
        collectionTypeArray[0]['data'] = res.data.favors.filter(it => it.specType === 'animal')
        collectionTypeArray[1]['data'] = res.data.favors.filter(it => it.specType === 'plant')
        collectionTypeArray[2]['data'] = res.data.favors.filter(it => it.specType === 'insect')
        collectionTypeArray[3]['data'] = res.data.favors.filter(it => it.specType === 'fossil')
        console.log(collectionTypeArray)
        that.setData({
          collectionTypes: collectionTypeArray,
          fold: foldArray,
          arrowUrl: arrowUrlArray,
          collectionsVisible: collectionsVisibleArray,
        });
      }
    })
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

  /**
   * 显示收藏模块
   */
  showCollections: function (e) {
    var index = e.currentTarget.dataset.index;
    var temp1 = this.data.collectionsVisible;
    var temp2 = this.data.arrowUrl;
    var temp3 = this.data.fold;
    if (e.currentTarget.dataset.fold) {
      temp1[index] = "block";
      temp2[index] = "/res/down_arrow.png";
      temp3[index] = false;
      this.setData({
        collectionsVisible: temp1,
        arrowUrl: temp2,
        fold: temp3,
      });
    } else {
      temp1[index] = "none";
      temp2[index] = "/res/right_arrow.png";
      temp3[index] = true;
      this.setData({
        collectionsVisible: temp1,
        arrowUrl: temp2,
        fold: temp3,
      })
    }
  },

  /**
   * 跳转标本页
   */
  clickItem: function (event) {
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/item/${item.specType}/${item.specType}?id=${item.specId}`,
    })
  },
})