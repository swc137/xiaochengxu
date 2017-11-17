// news.js
var api = require("../../util/api.js")
var array = require("../../util/array.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.imgUrl,
    status:'',
    orderList: [],//订单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var status = options.status;
    that.setData({
      status:status
    });
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
    var status = that.data.status;
    //订单列表
    api.getOrderList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          orderList:arr
        })
      }
    }, status);
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
  
  }
})