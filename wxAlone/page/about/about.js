var api = require("../../util/api.js")
var WxParse = require('../../wxParse/wxParse.js');
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
    companyAddress:'',
    productList: '',
    markers: '',
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
    //用户信息
    api.getSiteinfo({
      success: (res) => {
        console.log(res)
        var site_info = res.data.site_info;
        var user_info = res.data.user_info.sysadmin;
        var longitude = user_info.longitude;
        var latitude = user_info.latitude;
        var address = user_info.company_address;
        var companyName = user_info.company_name;
        var companyDesc = user_info.company_desc;

        that.setData({
          longitude: longitude,
          latitude: latitude,
          address: address,
          companyName: companyName,
          companyDesc: companyDesc,
          markers: [{
            latitude: latitude,
            longitude: longitude,
            companyName: companyName,
            companyAddress: address
          }]
        })
        WxParse.wxParse('article', 'html', companyDesc, that, 0);

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
  openLocation:function(e){
    var that = this;
    var latitude = that.data.markers[0].latitude;
    var longitude = that.data.markers[0].longitude;
    var companyName = that.data.markers[0].companyName;
    var companyAddress = that.data.markers[0].companyAddress;
    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: companyName,
      address: companyAddress
    })
  }
})