// person.js
var api = require("../../util/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'未登录',
    loginHidden:false,
    menuHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      key: 'isLogin',
      success: function (res) {
        that.setData({
          username:res.data.username,
          loginHidden: true,
          menuHidden: false
        })
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
  //去注册
  toReg:function(){
    wx.navigateTo({
      url:'../register/register'
    });
  },
  //去登录
  toLogin:function(){
    wx.navigateTo({
      url: '../login/login'
    });
  },
  toMall:function(){
    wx.switchTab({
      url: '../mall/mall'
    });
  },
  toNews:function(){
    wx.navigateTo({
      url: '../news/news'
    });
  }
})