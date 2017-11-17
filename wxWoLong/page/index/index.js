var api = require("../../util/api.js")
var array = require("../../util/array.js")
// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    imgUrl: api.imgUrl,
    interval:3000,
    duration:1000,
    productList:'',
    phone:'0512-67025670',
    longitude:'120.629020',
    latitude:'31.318150',
    address:'江苏省苏州市姑苏区白塔东路329号',
    companyName:'卧龙菜馆'
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
    //轮播图
    api.getBanner({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          imgUrls: array.getBannerByArray(arr, 'image')
        })
      }
    });

    //加载产品列表(分页)
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          productList: arr
        })
      }
    }, 8, 1, '');
   
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 跳转到简介
   */
  toAbout:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  /**
   * 拨打电话
   */
  callPhone: function (e) {
    var phone = e.currentTarget.dataset.val;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 地图定位
   */
  toMap:function(e){
    var that = this;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    var companyName = that.data.companyName;
    var address = that.data.address;
    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: companyName,
      address: address
    })
  },
  /**
   * 跳转到产品列表
   */
  toProductList:function(){
    wx.navigateTo({
      url: '../product/product',
    })
  },
  navigate: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../detail/detail?product_id=' + id
    })
  }


})