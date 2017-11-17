// person.js
var api = require("../../util/api.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: { 'avatarUrl': '../../image/public/person-head.png','nickName':'微信昵称'},
    phone:''
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
  //跳转订单列表
  toOrder: function (e) {
    var status = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../order/order?status=' + status
    })
  },
  //跳转到关于我们
  toAbout: function(){
    wx.navigateTo({
      url: '../about/about'
    })
  },
  //跳转到收货地址
  toAddressList:function(){
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },
  //跳转到订单列表
  toOrderList:function(){
    wx.navigateTo({
      url: '../orderList/orderList',
    })
  },
  //拨打电话
  callPhone:function(e){
    var that = this
    var phone = that.data.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})