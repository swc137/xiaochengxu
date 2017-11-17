var api = require('../../util/api.js')
// sales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    about_us: 'active',
    company_info: '',
    page_name: 'about_us',
    imgUrl: api.imgUrl,
    info: '',
    content: '',
    images: [],
    topImgHidden: '',
    imagesW: {}
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
  toCall:function(e){
    var phone = e.currentTarget.dataset.id;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  toGo:function(e){
    var that = this;
    var latitude = '33.338380';
    var longitude = '120.146480';
    var companyName = '盐城圣豪洲装饰工程有限公司';
    var companyAddress = '世纪大道金太阳装饰城5楼圣豪洲装饰';
    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: companyName,
      address: companyAddress
    })
  }

})