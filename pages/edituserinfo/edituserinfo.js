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
    sysPlatform: '',
    fontFamily: '',
  },

  onLoad: function (options) {
    var now = new Date()
    var now_year = now.getFullYear();
    var now_month = now.getMonth();
    var now_day = now.getDay();
    this.setData({
      now:now_year + '-' + now_month + '-' + now_day
    });

    //获取平台类型
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          fontFamily: res.platform == 'ios' ? "PingFang SC" :"Microsoft Yahei"
        })
      },
    })
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
    if(this.data.sex != '' && this.data.birth != ''){
      //取到User Page
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];

      //计算年龄
      var now = new Date()
      var now_year = now.getFullYear();
      var now_month = now.getMonth();
      var now_day = now.getDay();
      var birth_year = Number(this.data.birth.substring(0, 4));
      var birth_month = Number(this.data.birth.substring(5, 7));
      var birth_day = Number(this.data.birth.substring(8));
      var age = 0;
      if (this.data.birth != '') {
        if (now_year >= birth_year) {
          age += now_year - birth_year;
        }
        if (now_month < birth_month) {
          age -= 1;
        } else if (now_month == birth_month && now_day < birth_day) {
          age -= 1;
        }
        prevPage.setData({
          age: age,
        });
      }

      //性别
      if (this.data.sex != '') {
        prevPage.setData({
          sex: this.data.sex,
        });
      }

      //上传数据
      wx.request({
        url: 'http://172.18.233.8:52080/userAuth/update',
        method: 'POST',
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        data: this.data.school == ''? {
          openid: wx.getStorageSync('openid'),
          sex: this.data.sex == '男' ? 'man' : 'woman',
          birth: this.data.birth,
          mobile: this.data.tel
        } : {
            openid: wx.getStorageSync('openid'),
            sex: this.data.sex == '男' ? 'man' : 'woman',
            birth: this.data.birth,
            school: this.data.school,
            mobile: this.data.tel
          }
      })

      //返回User Page
      wx.navigateBack({
        delta: 1,
      })
    }else{ //信息不全
      wx.showModal({
        title: 'Error',
        content: '性别和出生日期不能为空！',
      })
    }
  },
})