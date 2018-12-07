Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentTab: 0,
    exhibitImageHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    });

    wx.request({
      url: "https://www.sysubiomuseum.com/search/plant",
      method: "GET",
      data: {
        specimenId: this.id,
        openid: wx.getStorageSync('openid')
      },
      dataType: "json",
      success: function(res) {
        console.log(res)
        var date = res.data.specimen_colDate;
        if (date != null) {
          date.match(/(\d{4})(\d{0,2})(\d{0,2})/);
          date = RegExp.$1 + (RegExp.$2 === "" ? "" : "-" + RegExp.$2) + (RegExp.$3 === "" ? "" : "-" + RegExp.$3);
        } else {
          date = "";
        }

        var province = res.data.specimen_province === null ? "" : res.data.specimen_province;
        var city = res.data.specimen_city === null ? "" : res.data.specimen_city;
        var loc = res.data.specimen_loc === null ? "" : res.data.specimen_loc;

        var specDes = res.data.specimen_des === null ? "" : res.data.specimen_des;
        if (specDes != "") {
          specDes.match(/[^，；。]+[，；。]*/g).map((e, i) => i + 1 + ")" + e + "\n").reduce((a, b) => a.concat(b));
        }

        that.setData({
          // pic_src: (res.data.specimen_pic).map(x => "https://www.sysubiomuseum.com/pic/" + x),
          hasFavor: res.data.hasFavor,
          exhibit_information: {
            name: res.data.spec_chName,
            nickname: res.data.spec_Alias === null ? "" : "俗名：" + res.data.spec_Alias,
            category: res.data.genus_chName === null ? "" : res.data.genus_chName,
            share: '/res/share.png',
            position: res.data.specimen_pos === null ? "" : "存放位置：" + res.data.specimen_pos,
            collect: (res.data.specimen_collector === null ? "" : "采集人：" + res.data.specimen_collector) + (date === "" ? "" : " 采集日期：" + date) + (province + city + loc === "" ? "" : " 采集地点：" + province + city + loc),
            bar: "/res/bar.png",
            specimen_description: specDes,
            morphology_description: res.data.spec_formDes === null ? "" : res.data.spec_formDes,
            surroundings: res.data.spec_envir === null ? "" : res.data.spec_envir,
            application_value: res.data.spec_value === null ? "" : res.data.spec_value,
            distribution: (res.data.spec_distrWorld === null ? "" : "世界分布：" + res.data.spec_distrWorld) + (res.data.spec_distrIn === null ? "" : "\n" + res.data.spec_distrIn),
          }
        })
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

  setFavor: function () {
    var that = this;
    if (this.data.hasFavor) {    //取消收藏
      wx.request({
        url: "https://www.sysubiomuseum.com/userFavor/removefavor",
        data: {
          specimenId: this.id,
          openid: wx.getStorageSync('openid'),
          specimenType: 'plant'
        },
        method: "GET",
        dataType: "json",
        success: function (res) {
          if (res.data.result === 'success') {
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
          specimenType: 'plant',
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

  imageLoad: function (e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var ratio = this.data.screenWidth / width;
    this.setData({
      exhibitImageHeight: ratio * height,
    });
  }
})