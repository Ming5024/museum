Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    exhibitImageHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //跳转测试
    var id = options.id;
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.windowWidth,
        })
      },
    });

    wx.request({
      url: "http://172.18.233.8:52080/search/insect",
      data: {specimenId: id},
      method: "GET",
      dataType: "json",
      success: function(res) {
        var speciDes = res.data.specimen_des === null ? "" : res.data.specimen_des;
        if (speciDes != "") {
          speciDes = sepciDes.match(/.*?。/).map((e, i) => i + 1 + ")" + e + "\n").reduce((a, b) => a.concat(b));
        }

        var province = res.data.specimen_province === null ? "" : res.data.specimen_province;
        var city = res.data.specimen_city === null ? "" : res.data.specimen_city;
        var loc = res.data.specimen_loc === null ? "" : res.data.specimen_loc;

        that.setData({
          pic_src: (res.data.specimen_pic).map(x => "http://172.18.233.8:52080/pic/" + x),
          exhibit_information: {
            name: res.data.spec_chName === null ? "" : res.data.spec_chName,
            nickname: res.data.spec_commonName === null ? "" : "（俗名：" + res.data.spec_commonName + "）",
            gender: res.data.specimen_sex === null ? "" : (res.data.specimen_sex === "♂" ? "/res/male.png" : "/res/female.png"),
            category: (res.data.family_chName === null ? "" : res.data.family_chName) + (res.data.genus_chName === null ? "" : res.data.genus_chName),
            share: '/res/share.png',
            position: res.data.specimen_pos === null ? "" : res.data.specimen_pos,
            collect: (res.data.specimen_collector === null ? "" : "采集人：" + res.data.specimen_collector) + (res.data.specimen_colDate === null ? "" : " 采集日期：" + res.data.specimen_colDate)  + (province + city + loc  === "" ? "" : "\n采集地点：" + province + city + loc),
            bar: '/res/bar.png',
            specimen_description: speciDes,
            morphology_description: res.data.spec_formDes === null ? "" : res.data.spec_formDes,
            body_length: res.data.spec_length === null ? "" : res.data.spec_length,
            body_color: res.data.spec_bodyColor === null ? "" : res.data.spec_bodyColor,
            habit: res.data.habit === null ? "" : res.data.habit,
            distribution: (res.data.spec_distrWorld === null ? "" : "世界分布：" + res.data.spec_distrWorld + "。") + (res.data.spec_distrIn === null ? "" : "\n国内分布："  + res.data.spec_distrIn + "。"), 
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

  imageLoad: function (e) {
    var width = e.detail.width;
    var height = e.detail.height;
    var ratio = this.data.screenWidth / width;
    this.setData({
      exhibitImageHeight: ratio * height,
    });
  }
})