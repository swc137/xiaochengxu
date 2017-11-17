var WxParse = require('../../wxParse/wxParse.js');
var api = require('../../util/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.imgUrl,
    longitude: '',
    latitude: '',
    address: '',
    companyName: '',
    companyDesc: '',
    companyAddress: '',
    productList: '',
    markers: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    var that = this
    var imgUrl = that.data.imgUrl;
    api.getNavDetail({
      success:(res) =>{
        if(res.data.code == '10001'){
          var info = res.data.data;
          var article = info.content.replace(/\/upload/g, imgUrl + '/upload');
          WxParse.wxParse('article', 'html', article, that, 0);
        }
        
      }
    },'about_us')
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