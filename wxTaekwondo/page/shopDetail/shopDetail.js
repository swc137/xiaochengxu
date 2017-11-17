var api = require('../../util/api.js')
// detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storeId:'',//商家ID
    storeDetail:'',//商家信息
    mobile:'',//联系电话
    content:'',//公司简介
    imgUrl: api.imgUrl,//图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      storeId: options.storeId
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
    var storeId = that.data.storeId;
    //推荐商家详情
    api.getStoreDetail({
      success: (res) => {
        var arr = res.data.data;
        var content = arr.description.replace(/<p>/g, '').split(/<\/p>/g);
        var mobile = arr.mobile;
        that.setData({
          storeDetail: arr,
          content: content,
          mobile: mobile
        })
      }
    }, storeId);
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
  //拨打电话
  onCall:function(){
    var that = this;
    var mobile = that.data.mobile;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  }
})