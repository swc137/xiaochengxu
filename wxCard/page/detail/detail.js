var api = require('../../util/api.js')
var array = require('../../util/array.js')
var WxParse = require('../../wxParse/wxParse.js')
// detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.imgUrl,
    product_id:'',
    detailInfo:'',
    imgUrl: api.imgUrl,
    images:'',
    imagesW: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      product_id: options.product_id
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
    var product_id = that.data.product_id;
    var imgUrl = that.data.imgUrl;
    //加载产品详情
    api.getProdectDetail({
      success: (res) => {
        var info = res.data.data;
        that.setData({
          detailInfo:info
        })
        var article = info.con_description.value.replace(/\/upload/g, imgUrl + '/upload');
        WxParse.wxParse('article', 'html', article, that, 0);
      }
    }, product_id);
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