// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    riderCommentList: [{
      value: 'ALL',
      selected: false,
      title: '所有'
    }, {
      value: 'animal',
      selected: false,
      title: '动物'
    }, {
        value: 'plant',
        selected: false,
        title: '植物'
    }, {
        value: 'insect',
        selected: false,
        title: '昆虫'
    }, {
        value: 'fossil',
        selected: false,
        title: '化石'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.request({
      url: "https://www.sysubiomuseum.com/userHistory/gethistory",
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: "GET",
      dataType: "json",
      success: function (res) {
        var history = res.data.history.reverse();
        for(let i of history) {
          i.visited = that.convertDate(i.visited);
          if(i.pics.length == 0) {
            i.pics = "/res/notfound.png"
          }
          else {
            i.pics = `https://www.sysubiomuseum.com/pic/${i.pics[0]}`
          }
        }
        that.setData({
          history: res.data.history,
          storageHistory: res.data.history,
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

  /**
   * 用户访问时间转换
   */
  convertDate: function(s) {
    var visitedDate = new Date(Date.parse(s));
    var presentDate = new Date();
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;

    var diffValue = presentDate - visitedDate;//时间差

    if (diffValue < 0) { return; }

    var minC = diffValue / minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;

    var result = "";
    if (monthC >= 1) {
      return `${parseInt(monthC)}月前`;
    }
    else if (dayC >= 1) {
      return `${parseInt(dayC)}天前`;
    }
    else if (hourC >= 1) {
      return `${parseInt(hourC)}小时前`;
    }
    else if (minC >= 1) {
      return `${parseInt(minC)}分钟前`;
    } else {
      return "刚刚";
    }
  },

  /**
   * 跳转标本页
   */
  clickItem: function(event) {
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/item/${item.specimanType}/${item.specimanType}?id=${item.specimanNum}`,
    })
  },

  checkboxChange(e) {
    console.log('checkboxChange e:', e);
    if (e.target.dataset.value == 'ALL' && !this.data.riderCommentList[e.target.dataset.index].selected) {
      //设置全选
      for(let i = 4; i >= 0; i--) {
        let string = "riderCommentList[" + i + "].selected"
        console.log(string)
        console.log(!this.data.riderCommentList[e.target.dataset.index].selected)
        this.setData({
          [string]: !this.data.riderCommentList[e.target.dataset.index].selected
        })
      }
    }
    else {
      let string = "riderCommentList[" + e.target.dataset.index + "].selected"
      console.log(string)
      if (this.data.riderCommentList[0].selected && e.target.dataset.index !== 0) {
        let all = "riderCommentList[0].selected"
        this.setData({
          [all]: !this.data.riderCommentList[e.target.dataset.index].selected
        })
      }
      this.setData({
        [string]: !this.data.riderCommentList[e.target.dataset.index].selected
      })
      console.log(this.data)
    }
    
    let detailValue = this.data.riderCommentList.filter(it => it.selected && it.value != "ALL").map(it => it.value)
    console.log('所有选中的值为：', detailValue)
    this.setData({
      history:this.data.storageHistory.filter(it => detailValue.indexOf(it.specimanType) !== -1)
    })
  },
})