var api = require('../../util/api.js')
// detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsId:'',
    detailInfo:'',
    imgUrl: api.imgUrl,
    content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      newsId: options.newsId
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
    var newsId = that.data.newsId;
    //热门资讯详情
    api.getNewsDetail({
      success: (res) => {
        var arr = res.data.data;
        var content = arr.description.replace(/<p>/g, '').split(/<\/p>/g);
        that.setData({
          detailInfo: arr,
          content: content
        })
      }
    },newsId);
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
})