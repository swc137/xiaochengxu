// person.js
var api = require("../../util/api.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: { 'avatarUrl': '../../image/public/person-head.png','nickName':'微信昵称'},
    phone:'',
    res:'',
    user_id:'',
    btn:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
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
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
    wx.getStorage({
      key: 'data',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    //用户信息
    api.getSiteinfo({
      success: (res) => {
        var user_info = res.data.user_info.sysadmin;
        var phone = user_info.mobile;
        that.setData({
          phone: phone
        })
      }
    });

    wx.getStorage({
      key: 'code',
      success: function (res) {
        that.setData({
          btn:false
        })
      }, fail: function () {
      
      }
    })

    var userInfo,nickName,avatarUrl,gender,province ,city,country,language,user_id,encryptedData,iv
    //用户信息
    wx.getStorage({
      key: 'res',
      success: function (res) {
        that.setData({
          res: res.data
        })
         userInfo = res.data.userInfo
         nickName = userInfo.nickName
         avatarUrl = userInfo.avatarUrl
         gender = userInfo.gender
         province = userInfo.province
         city = userInfo.city
         country = userInfo.country
         language = userInfo.language
         user_id = that.data.user_id;
         encryptedData = res.data.encryptedData
         iv = res.data.iv
         //保存用户信息
         api.toSaveInfo({
           method: 'POST',
           data: { nickName: nickName, avatarUrl: avatarUrl, gender: gender, province: province, city: city, country: country, language: language, user_id: user_id, encryptedData: encryptedData, iv: iv },
           success: (res) => {
             //console.log(res)
           }
         });
        
      }
    })
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
  //跳转到关于我们
  toAbout: function(){
    wx.navigateTo({
      url: '../about/about'
    })
  },
  //跳转到领取红包
  toAct:function(){
    wx.navigateTo({
      url: '../activity/activity',
    })
  },
  //拨打电话
  callPhone:function(e){
    var that = this
    var phone = that.data.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  getPhoneNumber: function (e) {
    var that = this;
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    //保存手机号
    api.toSavePhone({
      method: 'POST',
      data: { user_id: that.data.user_id, encryptedData: encryptedData, iv: iv },
      success: (res) => {
        if (res.data.code == '1001') {
          try {
            wx.setStorageSync('code', res.data.code)
            that.setData({
              btn: false
            })
            wx.navigateTo({
              url: '../activity/activity',
            })
          } catch (e) {
          }
        }

      }
    });
  },
  toShare:function(){
    try {
      var value = wx.getStorageSync('share');
      if (value != '') {
        wx.navigateTo({
          url: '../share/share?h_id='+value,
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请先领取红包并分享活动',
          showCancel: false,
          success: function (res) {
          }
        })
      }
    } catch (e) {
    }
    
  }
})