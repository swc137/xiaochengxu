// page/orderDetail/orderDetail.js
var api = require('../../util/api.js')
var util = require('../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.imgUrl,
    orderDetail:'',
    order_no:'',
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      'order_no':options.id
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
      key: 'data',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
        var info = { 'user_id': that.data.user_id, 'order_no': that.data.order_no};
        api.orderDetail({
          method: 'POST',
          data: info,
          success: (res) => {
            var arr = res.data.data;
            var time = util.formatTime(new Date(arr.add_time * 1000));
            that.setData({
              orderDetail: arr,
              time:time
            })
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
  
  }
})