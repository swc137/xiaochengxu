// person.js
var api = require("../../util/api.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    imgUrl:'../../image/public/person-head.png',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据  
    app.getUserInfo(function (userInfo) {
      //更新数据  
      that.setData({
        userInfo: userInfo,
        imgUrl: userInfo.avatarUrl,
        name: userInfo.nickName
      })
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
      url: '../more/more'
    })
  }
})