Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentTab: 0,
    exhibitImageHeight: 0,
  },

  /** 生命周期函数--监听页面加载完成*/
  onLoad: function (options) {
    //跳转测试
    this.id = options.id;
    // var id = options.id;
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,
        })
      },
    })

    wx.request({
      url: "https://www.sysubiomuseum.com/search/animal",
      data: {
        specimenId: this.id,
        openid: wx.getStorageSync('openid')
      },
      method: "GET",
      dataType: "json",
      success: function(res) {
        var order = res.data.order_chName === null ? "" : res.data.order_chName;
        var family = res.data.family_chName === null ? "" : res.data.family_chName;
        var genus = res.data.genus_chName === null ? "" : res.data.genus_chName;
        var date = res.data.specimen_colDate === null ? "" : res.data.specimen_colDate;
        var formatDate = "";
        if (date != "") {
          date = date.match(/\d+/g);
          for (var i = 0; i < date.length - 1; i++) {
            formatDate += date[i] + "-";
          }
          formatDate += date[date.length - 1];
        }
      
        var specimenDesArray = res.data.specimen_des === null ? "" : res.data.specimen_des;
        specimenDesArray = specimenDesArray.split(" ");
        var specimenDes = "";
        for (var j = 0; j < specimenDesArray.length - 1; j++) {
          specimenDes += j + 1 + ")" + specimenDesArray[j] + "\n";
        }
        specimenDes += j + 1 + ")" + specimenDesArray[specimenDesArray.length - 1];
        var collectPosition = (res.data.specimen_province === null ? "" : res.data.specimen_province) + (res.data.specimen_city === null ? "" : res.data.specimen_city) + (res.data.specimen_loc === null ? "" : res.data.specimen_loc);
        that.setData({
          pic_src: (res.data.specimen_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x), 
          hasFavor: res.data.hasFavor,
          exhibit_information: {
            share: "/res/share.png",
            bar: "/res/bar.png",
            name: res.data.spec_chName,
            nickname: res.data.spec_commonName === null ? "" : "(俗名：" + res.data.spec_commonName + ")",
            gender: res.data.specimen_sex === "♂" ? "/res/male.png" : "/res/female.png",
            category: order + family + genus,
            habit: res.data.habit === null ? "" : res.data.habit,
            distribution: (res.data.spec_distrOut === null ? "" : "世界分布：" + res.data.spec_distrOut + "\n") + (res.data.spec_distrIn === null ? "" : "国内分布：" + res.data.spec_distrIn),
            classification_feature: res.data.spec_divFeature === null ? "" : res.data.spec_divFeature,
            position: res.data.specimen_pos === null ? "" : "位置：" + res.data.specimen_pos,
            collect: (res.data.specimen_collector === null ? "" : "采集人：" + res.data.specimen_collector) + (formatDate === "" ? "" : " 采集时间：" + formatDate) + (collectPosition === "" ? "" : " 采集地点：" + collectPosition),
            specimen_description: specimenDes,
          }
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

  setFavor: function() {
    var that = this;
    if(this.data.hasFavor) {    //取消收藏
      wx.request({
        url: "https://www.sysubiomuseum.com/userFavor/removefavor",
        data: {
          specimenId: this.id,
          openid: wx.getStorageSync('openid'),
          specimenType: 'animal'
        },
        method: "GET",
        dataType: "json",
        success: function (res) {
          if(res.data.result === 'success') {
            that.setData({
              hasFavor: false
            });
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              duration: 1200
            })
          }
        }
      })
    }
    else {                      //收藏
      wx.request({
        url: "https://www.sysubiomuseum.com/userFavor/addfavor",
        data: {
          specimenId: this.id,
          openid: wx.getStorageSync('openid'),
          specimenType: 'animal',
          chName: this.data.exhibit_information.name
        },
        method: "GET",
        dataType: "json",
        success: function (res) {
          if (res.data.result === 'success') {
            that.setData({
              hasFavor: true
            });
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1200
            })
          }
          else {
            wx.showToast({
              title: '收藏失败，请重试',
              image: '/res/failtip.png',//自定义图标的本地路径，image 的优先级高于 icon
              icon: 'success',
              duration: 1200
            })
          }
        }
      })
    }
  },

  imageLoad: function(e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var ratio = this.data.screenWidth / width;
    this.setData({
      exhibitImageHeight: ratio * height,
    });
  }
})