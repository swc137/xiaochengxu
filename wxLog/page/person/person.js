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
    phone: '',
    longitude: '',
    latitude: '',
    address: '',
    companyName: '',
    companyDesc: ''
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
    //调用应用实例的方法获取全局数据  
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
    //用户信息
    api.getSiteinfo({
      success: (res) => {
        var site_info = res.data.site_info;
        var user_info = res.data.user_info.sysadmin;
        var phone = user_info.mobile;
        var longitude = user_info.longitude;
        var latitude = user_info.latitude;
        var address = user_info.company_address;
        var companyName = user_info.company_name;
        var companyDesc = user_info.company_desc_text;
        that.setData({
          phone: phone,
          longitude: longitude,
          latitude: latitude,
          address: address,
          companyName: companyName,
          companyDesc: companyDesc
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
  },
  /**
   * 地图定位
   */
  toMap: function (e) {
    var that = this;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    var companyName = that.data.companyName;
    var address = that.data.address;
    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: companyName,
      address: address
    })
  }
})