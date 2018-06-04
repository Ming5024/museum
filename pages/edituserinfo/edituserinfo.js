// pages/edituserinfo.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birth:'',
    sex:'',
    rangeSex:['男', '女'],
    school:'',
    tel: '', 
    now: '',
  },

  onLoad: function (options) {
    var now = new Date()
    var now_year = now.getFullYear();
    var now_month = now.getMonth();
    var now_day = now.getDay();
    this.setData({
      now:now_year + '-' + now_month + '-' + now_day
    });
  },

  bindSexChange:function(e){
    this.setData({
      sex: e.detail.value == 0?'男':'女'
    })
  },
  bindBirthChange:function(e) {
    this.setData({
      birth: e.detail.value
    })
  },
  bindSchoolChange:function(e){
    this.setData({
      school: e.detail.value
    })
  },
  bindTelChange: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  save:function(e){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var now = new Date()
    var now_year = now.getFullYear();
    var now_month = now.getMonth();
    var now_day = now.getDay();
    var birth_year = Number(this.data.birth.substring(0, 4));
    var birth_month = Number(this.data.birth.substring(5, 7));
    var birth_day = Number(this.data.birth.substring(8));
    var age = 0;
    if(now_year >= birth_year){
      age += now_year - birth_year;
    }
    if (now_month < birth_month) {
      age -= 1;
    } else if (now_month == birth_month && now_day < birth_day) {
      age -= 1;
    }
    prevPage.setData({
      sex:this.data.sex,
      age:age,
    });
    wx.navigateBack({
      delta: 1,
    })
  },

})